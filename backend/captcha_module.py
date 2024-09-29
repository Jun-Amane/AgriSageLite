import random
import string
import time
from io import BytesIO

from captcha.image import ImageCaptcha


class CaptchaModule:
    def __init__(self):
        self.captcha_store = {}
        self.expiration_time = 300  # 5 minutes in seconds
        self.image_generator = ImageCaptcha(width=200, height=80)

    def generate_captcha(self, session_id):
        # Generate a random 6-character string
        captcha_text = "".join(
            random.choices(string.ascii_uppercase + string.digits, k=6)
        )

        # Generate the image
        image_bytes = self.image_generator.generate(captcha_text)

        # Store the captcha with session_id
        self._store_captcha(session_id, captcha_text)

        # Reset the BytesIO object's position to the beginning
        image_bytes.seek(0)

        return image_bytes, captcha_text

    def _store_captcha(self, session_id, captcha_text):
        current_time = time.time()

        # Remove expired captchas for this session
        if session_id in self.captcha_store:
            self.captcha_store[session_id] = [
                (text, timestamp)
                for text, timestamp in self.captcha_store[session_id]
                if current_time - timestamp < self.expiration_time
            ]
        else:
            self.captcha_store[session_id] = []

        # Add new captcha
        self.captcha_store[session_id].append((captcha_text, current_time))

        # Keep only the latest captcha if there are multiple
        if len(self.captcha_store[session_id]) > 1:
            self.captcha_store[session_id] = self.captcha_store[session_id][-1:]

    def verify_captcha(self, session_id, user_input):
        user_input = (
            user_input.upper()
        )  # Convert to uppercase for case-insensitive comparison
        current_time = time.time()

        if session_id in self.captcha_store:
            for captcha_text, timestamp in self.captcha_store[session_id]:
                if (
                    current_time - timestamp < self.expiration_time
                    and user_input == captcha_text
                ):
                    self.captcha_store[session_id] = (
                        []
                    )  # Clear captchas for this session
                    return True

            # Remove expired captchas
            self.captcha_store[session_id] = [
                (text, timestamp)
                for text, timestamp in self.captcha_store[session_id]
                if current_time - timestamp < self.expiration_time
            ]

        return False

    def cleanup(self):
        # Remove all expired captchas from all sessions
        current_time = time.time()
        for session_id in list(self.captcha_store.keys()):
            self.captcha_store[session_id] = [
                (text, timestamp)
                for text, timestamp in self.captcha_store[session_id]
                if current_time - timestamp < self.expiration_time
            ]
            if not self.captcha_store[session_id]:
                del self.captcha_store[session_id]
