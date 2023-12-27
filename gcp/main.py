from google.cloud import storage
import tensorflow as tf
from PIL import Image
import numpy as np
import pickle

BUCKET_NAME = "traffic-tf-models-2"

with open("class_names.pkl", "rb") as file:
    CLASS_NAMES = pickle.load(file)
    
model = None

def download_blob(bucket_name, source_blob_name, destination_file_name):
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)
    
def predict(request):
    global model
    if model is None:
      download_blob(
         BUCKET_NAME,
         "models/traffic.h5",
         "/tmp/traffic.h5"
        
      )
    model = tf.keras.models.load_model("/tmp/traffic.h5")
    
    image = request.files["file"]
    
    image = np.array(Image.open(image).convert("RGB").resize((256,256)))
    image = image/255
    img_array = tf.expand_dims(image, 0)
    
    predictions = model.predict(img_array)
    print(predictions)
    
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))
    
    return {"class": predicted_class, "confidence": confidence}
    