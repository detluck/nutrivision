import base64
import mimetypes

from openai import OpenAI
from django.conf import settings


def get_image_class(image_path: str):
    api_key = (getattr(settings, "OPENAI_KEY", "") or "").strip()
    if not api_key:
        raise RuntimeError("OPENAI_KEY is not configured")

    client = OpenAI(api_key=api_key)

    mime_type = mimetypes.guess_type(image_path)[0] or "image/jpeg"
    with open(image_path, "rb") as file_obj:
        encoded_image = base64.b64encode(file_obj.read()).decode("utf-8")

    response = client.responses.create(
        model="gpt-5.4-nano",
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": "Identify the main food item in this image. Return only the food name.",
                    },
                    {
                        "type": "input_image",
                        "image_url": f"data:{mime_type};base64,{encoded_image}",
                    },
                ],
            },
        ],
    )

    prediction = (response.output_text or "").strip()
    if not prediction:
        raise RuntimeError("OpenAI did not return a food prediction")

    return {
        "prediction": prediction,
        "confidence": 1.0,
        "options": [prediction],
    }
