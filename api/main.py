from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image
import tensorflow as tf
from keras import models, layers
import pickle

app = FastAPI()
MODEL = tf.keras.models.load_model("./models/1")

with open("training/class_names.pkl", "rb") as file:
    CLASS_NAMES = pickle.load(file)

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    image = tf.image.resize(image, (256, 256))
    return image

@app.post("/predict")
async def predict( # predict function is designed to work asynchronously. It means that this function can "pause" at points where it performs I/O operations (like reading an uploaded file) and allow other code to execute in the meantime. This is particularly useful in web applications where handling multiple requests at once is important for performance
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    # await file.read() pauses the execution of the predict function until the file reading operation is complete.While this is happening, other code can continue to execute
    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)

