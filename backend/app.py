import secrets
import uuid
from flask import Flask, jsonify, request, send_file, session, make_response
from flask_cors import CORS
from captcha_module import CaptchaModule
from data_processing import process_input_data
from knowledge_module import KnowledgeModule
from predict import ClassificationModule

from app_agkg import *

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
CORS(app, supports_credentials=True)

ai_module = ClassificationModule()
knowledge_module = KnowledgeModule()
captcha_module = CaptchaModule()


@app.route("/api/get_session_id", methods=["GET"])
def get_session_id():
    if "session_id" not in session:
        session["session_id"] = str(uuid.uuid4())

    print("Session after setting session_id:", session)
    response = make_response(jsonify({"session_id": session["session_id"]}))
    response.set_cookie('session_id', session["session_id"], httponly=True, secure=True, samesite='None')
    return response


@app.route("/api/captcha", methods=["GET"])
def get_captcha():
    if "session_id" not in session:
        session["session_id"] = str(uuid.uuid4())

    print("Session in get_captcha:", session)
    image_bytes, _ = captcha_module.generate_captcha(session["session_id"])
    response = make_response(send_file(image_bytes, mimetype="image/png"))
    response.set_cookie('session_id', session["session_id"], httponly=True, secure=True, samesite='None')
    return response


@app.route("/api/classify", methods=["POST"])
def classify():
    print("Session at the start of classify:", session)
    print("Cookies received:", request.cookies)

    session_id = request.cookies.get('session_id')
    if not session_id:
        return jsonify({"error": "No valid session. Please refresh the page."}), 400

    if "session_id" not in session:
        session["session_id"] = session_id

    if (
            "image" not in request.files
            or "description" not in request.form
            or "captcha" not in request.form
    ):
        return jsonify({"error": "Missing required fields"}), 400

    # Verify Captcha
    captcha = request.form.get("captcha")
    if not captcha or not captcha_module.verify_captcha(session["session_id"], captcha):
        return jsonify({"error": "Invalid captcha"}), 400

    # Data processing
    try:
        img, cap, type_name = process_input_data(request)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # Do Classification
    try:
        result = ai_module.classify(img, cap, type_name)
    except Exception as e:
        return jsonify({"error": "Classification failed:" + str(e)}), 500

    # Check if succeed & append knowledge
    if result["status"] == "success":
        knowledge = knowledge_module.get_knowledge(type_name, result["top_category"])
        if knowledge:
            result["agricultural_knowledge"] = knowledge

    print(result)
    return jsonify(result)


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        if not data or 'message' not in data:
            return jsonify({"error": "Invalid request. 'message' is required."}), 400

        sent = data['message']
        response = question_deal(sent)

        return jsonify({
            "status": "success",
            "response": response,
            "timestamp": int(time.time())
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "error": str(e),
            "timestamp": int(time.time())
        }), 500


@app.after_request
def add_header(response):
    if "session_id" in session:
        # response.set_cookie('session_id', session["session_id"], httponly=True, secure=False, samesite='None')
        response.set_cookie('session_id', session["session_id"], httponly=True, secure=False)

    return response


if __name__ == "__main__":
    app.run(debug=True, port=40332)
