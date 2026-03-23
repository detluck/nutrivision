# %%
import sys
import os
import numpy as np
import pandas as pd
import tensorflow as tf
import django
from PIL import Image as PilImage
import matplotlib.pyplot as plt

# %%
sys.path.append(os.path.abspath(".."))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "food_advisor.settings")
django.setup()
from backend.models import Image

# %% [markdown]
# ### Loading the model

# %%
model = tf.keras.models.load_model("models/base_model.keras")

# %%
class_names = ['apple_pie', 'baby_back_ribs',
 'baklava', 'beef_carpaccio', 'beef_tartare',
 'beet_salad',
 'beignets',
 'bibimbap',
 'pizza',
 'pork_chop',
 'poutine',
 'prime_rib',
 'ramen',
 'ravioli',
 'red_velvet_cake',
 'risotto',
 'samosa',
 'sashimi',
 'scallops','seaweed_salad']

label_dict = {}
label_dict = {}
for i, class_name in enumerate(class_names):
    label_dict[i] = class_name

label_dict

# %%
def is_confident(prediction, threshold):
    if prediction.max() < threshold:
        return False
    
    return True

# %%
def make_prediction(image_path):
    image = PilImage.open(image_path)
    image = np.array(image.resize(size=(224, 224)))
    image = np.expand_dims(image, axis=0)
    prediction = model.predict(image)

    #fig, ax = plt.subplots(figsize=(12, 8))
    #labels = np.arange(1, 21)
    #ax.bar(labels, prediction.reshape(-1))
    #ax.xticks = [np.arange(0, 21)]
    print(is_confident(prediction, 0.7))

    prediction_info = {
        "prediction": prediction.argmax(),
        "confidence": prediction.max(),
        "options": np.argsort(prediction.reshape(-1))[-3:][::-1]
    }
    return prediction_info

make_prediction("../../FoodAdvisor/media/images/OIP_3.jpg")


