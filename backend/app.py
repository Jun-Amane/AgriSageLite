import secrets
import uuid

from flask import Flask, jsonify, request, send_file, session
from flask_cors import CORS

from captcha_module import CaptchaModule
from data_processing import process_input_data
from knowledge_module import KnowledgeModule
from predict import ClassificationModule

app = Flask(__name__)
# app.skkecret_key = "your_secret_key_here"j
app.secret_key = secrets.token_hex(16)
CORS(app, supports_credentials=True)

ai_module = ClassificationModule()
knowledge_module = KnowledgeModule()
captcha_module = CaptchaModule()


@app.route("/api/get_session_id", methods=["GET"])
def get_session_id():
    if "session_id" not in session:
        session["session_id"] = str(uuid.uuid4())
    return jsonify({"session_id": session["session_id"]})


@app.route("/api/captcha", methods=["GET"])
def get_captcha():
    if "session_id" not in session:
        session["session_id"] = str(uuid.uuid4())

    image_bytes, _ = captcha_module.generate_captcha(session["session_id"])
    return send_file(image_bytes, mimetype="image/png")


@app.route("/api/classify", methods=["POST"])
def classify():
    if (
        "image" not in request.files
        or "description" not in request.form
        or "captcha" not in request.form
        or "session_id" not in session
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
        knowledge = knowledge_module.get_knowledge(result["top_category"], type_name)
        if knowledge:
            result["agricultural_knowledge"] = knowledge

    print(result)
    return jsonify(result)


@app.before_request
def before_request():
    captcha_module.cleanup()


if __name__ == "__main__":
    app.run(debug=True)
