# models.py
import tensorflow as tf
from tensorflow.keras.models import load_model
import xgboost as xgb
import pandas as pd
import numpy as np

# Global variables to hold loaded models
xgboost_model = None
lstm_model = None

def load_all_models():
    """Loads the trained XGBoost and LSTM models."""
    global xgboost_model, lstm_model
    try:
        # Load XGBoost model
        xgboost_model = xgb.XGBClassifier()
        xgboost_model.load_model('xgboost_model.json') # Or .pkl if you saved that way
        print("XGBoost model loaded successfully.")
    except Exception as e:
        print(f"Error loading XGBoost model: {e}")
        xgboost_model = None

    try:
        # Load LSTM model
        # Custom objects might be needed if you used custom layers/metrics
        lstm_model = load_model('lstm_model.h5', compile=False) # Compile=False as we only need prediction
        print("LSTM model loaded successfully.")
    except Exception as e:
        print(f"Error loading LSTM model: {e}")
        lstm_model = None

def predict_with_xgboost(data_df):
    """Makes predictions using the loaded XGBoost model."""
    if xgboost_model is None:
        raise RuntimeError("XGBoost model not loaded.")
    # Ensure the input data has the same columns as the training data
    # This requires that data_df already has the correct feature columns
    try:
        predictions_proba = xgboost_model.predict_proba(data_df)[:, 1] # Get probability of class 1
        return predictions_proba
    except Exception as e:
        raise RuntimeError(f"Error during XGBoost prediction: {e}")

def predict_with_lstm(sequences_np):
    """Makes predictions using the loaded LSTM model."""
    if lstm_model is None:
        raise RuntimeError("LSTM model not loaded.")
    try:
        predictions_proba = lstm_model.predict(sequences_np).flatten() # Get probability of class 1 and flatten
        return predictions_proba
    except Exception as e:
        raise RuntimeError(f"Error during LSTM prediction: {e}")