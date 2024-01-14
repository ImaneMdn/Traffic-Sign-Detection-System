# Traffic-Sign-Detection-System
![image](https://github.com/ImaneMdn/Traffic-Sign-Detection-System/assets/115882702/f5beb7bb-5f0a-4a95-8ffd-377946600bb1)

![image](https://github.com/ImaneMdn/Traffic-Sign-Detection-System/assets/115882702/bd654af6-076c-428c-aeeb-5f5bdb5c3b7d)
![image](https://github.com/ImaneMdn/Traffic-Sign-Detection-System/assets/115882702/de332144-9480-40c4-a951-618609cc6359)
![image](https://github.com/ImaneMdn/Traffic-Sign-Detection-System/assets/115882702/45d2b1a8-cba5-403a-9cd5-89a2bde9395f)
![image](https://github.com/ImaneMdn/Traffic-Sign-Detection-System/assets/115882702/940cc407-a034-4b60-bb5a-8472e8d8e405)


![image](https://github.com/ImaneMdn/Traffic-Sign-Detection-System/assets/115882702/1bb1cdd9-4ac6-45ec-b243-c79c6d43bf44)
![image](https://github.com/ImaneMdn/Traffic-Sign-Detection-System/assets/115882702/0ab45b63-3844-41b7-affa-a76bac1019ce)

## Setup for Python:

1. Install Python.
2. Install Tensorflow Serving ([Setup instructions](https://www.tensorflow.org/tfx/serving/setup))

## Setup for ReactJS

1. Install Nodejs.
2. Install NPM.
3. Install dependencies.

## Setup for React-Native app

1. Go to the [React Native environment setup](https://reactnative.dev/docs/environment-setup), then select `React Native CLI Quickstart` tab.  
2. Install dependencies.

## Training the Model

1. Download the data from [kaggle](https://www.kaggle.com/datasets/ahemateja19bec1025/traffic-sign-dataset-classification).
2. Open `training/traffic_signs_detection_model.ipynb` in Jupyter Notebook.
3. Run all the Cells one by one.
7. Copy the model generated and save it with the version number in the `models` folder.

## Running the API

### Using FastAPI

1. Get inside `api` folder
2. Run the FastAPI Server using uvicorn

### Using FastAPI & TF Serve

1. Get inside `api` folder.
2. Run the TF Serve (Update config file path below).

```bash
docker run -t --rm -p 8501:8501 -v C:/Code/Traffic-Sign-Detection-System:/Traffic-Sign-Detection-System tensorflow/serving --rest_api_port=8501 --model_config_file=/Traffic-Sign-Detection-System/models.config
```

3. Run the FastAPI Server using uvicorn.
```bash
uvicorn main-tf-serving:app --reload --host 0.0.0.0
```

## Running the Frontend

1. Get inside `front` folder.
2. Update `REACT_APP_API_URL` to API URL in .env.
3. Run the frontend.
```bash
npm run start
```

## Running the app

1. Get inside `mobile-app` folder
2. Update `URL` to API URL in .env.
3. Run the app (android/iOS)

```bash
npm run android
```

or

```bash
npm run ios
```

## Deploying the TF Model (.h5) on GCP

1. Create a [GCP account](https://console.cloud.google.com/freetrial/signup/tos?_ga=2.25841725.1677013893.1627213171-706917375.1627193643&_gac=1.124122488.1627227734.Cj0KCQjwl_SHBhCQARIsAFIFRVVUZFV7wUg-DVxSlsnlIwSGWxib-owC-s9k6rjWVaF4y7kp1aUv5eQaAj2kEALw_wcB).
2. Create a [Project on GCP](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project) (Keep note of the project id).
3. Create a [GCP bucket](https://console.cloud.google.com/storage/browser/).
4. Upload the traffic.h5 model in the bucket in the traffic.h5`.
5. Install Google Cloud SDK ([Setup instructions](https://cloud.google.com/sdk/docs/quickstarts)).
6. Authenticate with Google Cloud SDK.

```bash
gcloud auth login
```

7. Run the deployment script.

```bash
cd gcp
gcloud functions deploy predict_lite --runtime python38 --trigger-http --memory 512 --project project_id
```

8. Your model is now deployed.
9. Use Postman to test the GCF using the [Trigger URL](https://cloud.google.com/functions/docs/calling/http).
