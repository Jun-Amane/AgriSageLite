import io

from PIL import Image
from torch.serialization import validate_cuda_device


def process_input_data(request):
    img_file = request.files.get("image")
    if not img_file:
        raise ValueError("No image file provided")

    cap = request.form.get("description")
    if not cap:
        raise ValueError("No caption provided")

    type_name = request.form.get("type")
    if type_name not in ["disease", "bird", "flower"]:
        raise ValueError("Invalid type")

    img = Image.open(io.BytesIO(img_file.read()))

    if img.mode == "RGBA":
        img = img.convert("RGB")

    return img, cap, type_name
