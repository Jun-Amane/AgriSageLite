import os
import pickle
from abc import ABC, abstractmethod
from typing import Any, Dict

import numpy as np
import scipy.stats
import torch
from nltk.tokenize import word_tokenize
from PIL import Image
from scipy.stats.distributions import entropy
from torchvision.transforms import InterpolationMode, v2


class BaseModelStrategy(ABC):
    def __init__(self, model_path: str, cats_path: str):
        self.model_path = model_path
        self.cats_path = cats_path

    def evaluate_classification(self, probabilities):
        max_prob = max(probabilities)
        top_two_probs = sorted(probabilities, reverse=True)[:2]
        entropy = scipy.stats.entropy(probabilities)
        if np.isinf(entropy) and entropy < 0:
            entropy = 0

        if (
            max_prob > 0.6
            or (top_two_probs[0] - top_two_probs[1]) > 0.2
            or entropy < 1.0
        ):
            return True, entropy
        else:
            return False, entropy

    def predict(self, img: Image.Image, cap: torch.Tensor) -> Dict[str, Any]:
        data_tf = v2.Compose(
            [
                v2.Resize((320, 320), interpolation=InterpolationMode.BICUBIC),
                v2.CenterCrop((300, 300)),
                v2.RandomHorizontalFlip(),
                v2.ToImage(),
                v2.ToDtype(torch.float32, scale=True),
            ]
        )

        img_tensor = data_tf(img)

        with open(self.cats_path, "rb") as f:
            cats = pickle.load(f)

        net_obj = torch.jit.load(self.model_path, map_location="cpu")

        with torch.no_grad():
            images = img_tensor.unsqueeze(0)
            captions = cap.unsqueeze(0)

            logits = net_obj(images, captions).squeeze()

            logits_np = logits.cpu().numpy()
            probabilities = torch.nn.functional.softmax(logits, dim=0)
            # std_dev = np.std(logits_np)
            # entropy = scipy.stats.entropy(probabilities)
            eval_result, entropy = self.evaluate_classification(probabilities)

            if not eval_result:
                all_probs = {
                    cat: probabilities[idx].item() for cat, idx in cats.items()
                }
                return {
                    "status": "failure",
                    "message": "Classification failed: confidence levels are too close",
                    "all_probabilities": {k: float(v) for k, v in all_probs.items()},
                    "entropy": float(entropy),
                }
            top_logit, top_idx = torch.max(logits, dim=0)

            probabilities = torch.nn.functional.softmax(logits, dim=0)
            all_probs = {cat: probabilities[idx].item() for cat, idx in cats.items()}

            top_category = next(
                cat for cat, idx in cats.items() if idx == top_idx.item()
            )

            return {
                "status": "success",
                "top_category": top_category,
                "top_probability": float(probabilities[top_idx].item()),
                "all_probabilities": {k: float(v) for k, v in all_probs.items()},
                "entropy": float(entropy),
            }


class WheatModelStrategy(BaseModelStrategy):
    def __init__(self):
        super().__init__(
            "data/cc747b68eb0689efa4d1491efe97d2bf3c397e3c.jit.pt",
            "data/dacce1692185f54cfb0e547aafd8a44a9a994cc5.pkl",
        )


class CUBModelStrategy(BaseModelStrategy):
    def __init__(self):
        super().__init__(
            "data/277958f85d68cc4d902fe1865be8859d2fc44793.jit.pt",
            "data/2aaf5ff3fca8aa3422fe5d98cbe72ce2f43233f1.pkl",
        )


class FlowersModelStrategy(BaseModelStrategy):
    def __init__(self):
        super().__init__(
            "data/71b202d108590e112910b128d0faa24c25739239.jit.pt",
            # "data/79c6752efab0856bef870dd8d37b12346801fe07.pkl",
            "data/3bfe7ece6210f85a8e2ab11a79ac02a47f7415e1.pkl",
        )


class ModelFactory:
    @staticmethod
    def create_model(model_type: str) -> BaseModelStrategy:
        if model_type == "disease":
            return WheatModelStrategy()
        elif model_type == "bird":
            return CUBModelStrategy()
        elif model_type == "flower":
            return FlowersModelStrategy()
        else:
            raise ValueError(f"Unsupported model type: {model_type}")


class MultiModalClassifier:
    def __init__(self):
        self.word2idx = self.load_word2idx(
            "data/a21e9644cde5a9c23ad9f0c7722ae91fbd0de363.pkl"
        )
        self.max_len = 200

    @staticmethod
    def load_word2idx(path: str) -> Dict[str, int]:
        if os.path.exists(path):
            with open(path, "rb") as f:
                return pickle.load(f)
        else:
            raise FileNotFoundError(
                "word2idx file not found. Please run the dataset with save_word2idx=True first."
            )

    def preprocess_text(self, text: str) -> torch.Tensor:
        tokenized_sent = word_tokenize(text)
        tokenized_sent = tokenized_sent[: self.max_len] + ["<PAD>"] * max(
            0, self.max_len - len(tokenized_sent)
        )
        input_id = [
            self.word2idx.get(token, self.word2idx["<UNK>"]) for token in tokenized_sent
        ]
        return torch.tensor(input_id)

    def classify(self, img: Image.Image, text: str, model_type: str) -> Dict[str, Any]:
        model_strategy = ModelFactory.create_model(model_type)
        processed_text = self.preprocess_text(text)
        return model_strategy.predict(img, processed_text)


class ClassificationModule:
    def __init__(self):
        self.classifier = MultiModalClassifier()

    def classify(self, img: Image.Image, cap: str, type_name: str):

        if type_name not in ["disease", "bird", "flower"]:
            raise ValueError("Invalid type")

        result = self.classifier.classify(img, cap, type_name)
        return result
