# app.py
import os
from flask import Flask, request, jsonify # Import jsonify to return JSON responses
import pandas as pd
import numpy as np

# Import functions from your processing and models modules
from processing import load_and_engineer_features, create_lstm_sequences, FEATURE_COLS_XGBOOST, FEATURE_COLS_LSTM
from models import load_all_models, predict_with_xgboost, predict_with_lstm

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define the sequence length used for LSTM training
LSTM_SEQUENCE_LENGTH = 50

# Load models when the application starts
with app.app_context():
    load_all_models()

# No need for an index route if frontend is separate
# @app.route('/')
# def index():
#     return "Your backend is running." # Or some simple landing page

@app.route('/predict', methods=['POST'])
def predict():
    # Ensure the uploads directory exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Check if the request contains the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Check if the file type is allowed (optional but recommended)
    allowed_extensions = {'txt', 'csv'} # Assuming .txt or .csv are allowed inputs
    if '.' not in file.filename or file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
        return jsonify({"error": "Invalid file type. Allowed types are .txt or .csv"}), 400

    if file:
        # Create a safe filename and path
        # from werkzeug.utils import secure_filename # Optional for sanitizing filename
        # filename = secure_filename(file.filename)
        filename = file.filename # Use original filename for simplicity, but sanitize in production
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        try:
            file.save(filepath)

            # Check if models are loaded
            if predict_with_xgboost is None or predict_with_lstm is None:
                 return jsonify({"error": "Machine learning models not loaded."}), 500

            # --- Data Processing and Feature Engineering ---
            # Pass the filepath to your processing function
            engineered_df = load_and_engineer_features(filepath)

            # --- Prepare Data for XGBoost ---
            # Select the feature columns used by the XGBoost model
            # Ensure all expected columns are present, handle missing ones if necessary
            try:
                 xgboost_data = engineered_df[FEATURE_COLS_XGBOOST]
            except KeyError as e:
                 return jsonify({"error": f"Missing required feature columns for XGBoost: {e}"}), 400


            # --- Prepare Data for LSTM ---
            # Select the feature columns used by the LSTM model and create sequences
            try:
                # Ensure all expected columns are present, handle missing ones if necessary
                 lstm_data = engineered_df[FEATURE_COLS_LSTM]
                 lstm_sequences, unit_cycle_info = create_lstm_sequences(engineered_df, LSTM_SEQUENCE_LENGTH, FEATURE_COLS_LSTM)
            except KeyError as e:
                 return jsonify({"error": f"Missing required feature columns for LSTM: {e}"}), 400


            # --- Make Predictions ---
            # XGBoost predictions
            try:
                xgboost_predictions_proba = predict_with_xgboost(xgboost_data)
            except RuntimeError as e:
                return jsonify({"error": f"XGBoost prediction failed: {e}"}), 500

            # LSTM predictions
            try:
                 # Check if there are enough sequences for LSTM prediction
                 if lstm_sequences.shape[0] == 0:
                     lstm_predictions_proba = np.array([]) # No sequences to predict on
                 else:
                     lstm_predictions_proba = predict_with_lstm(lstm_sequences)
            except RuntimeError as e:
                 return jsonify({"error": f"LSTM prediction failed: {e}"}), 500


            # --- Process and Return Results ---
            # Combine predictions and return a structured response.
            # The exact structure depends on how you want to present the results
            # in your frontend.

            # Example: Return predictions mapped back to the last cycle of each unit
            # This requires the unit_cycle_info from create_lstm_sequences
            results_list = []
            # Map LSTM predictions back to units/cycles
            lstm_results_map = {}
            for i, (unit, cycle) in enumerate(unit_cycle_info):
                 # If multiple sequences for the same unit/cycle, you might average or take the last
                 key = (unit, cycle)
                 if key not in lstm_results_map:
                     lstm_results_map[key] = []
                 lstm_results_map[key].append(lstm_predictions_proba[i])

            # Map XGBoost predictions back to units/cycles (more direct as it's per row)
            engineered_df['xgboost_prob_failure'] = xgboost_predictions_proba

            unique_units = engineered_df['unit_number'].unique()

            for unit in unique_units:
                 unit_df = engineered_df[engineered_df['unit_number'] == unit].sort_values(by='time_in_cycles')
                 if not unit_df.empty:
                     last_cycle_info = unit_df[['unit_number', 'time_in_cycles']].iloc[-1]
                     last_unit = int(last_cycle_info['unit_number'])
                     last_cycle = int(last_cycle_info['time_in_cycles'])

                     # Get XGBoost prediction for the last cycle
                     xgboost_pred_last_cycle = unit_df['xgboost_prob_failure'].iloc[-1]

                     # Get LSTM prediction(s) for the last cycle's sequences
                     lstm_preds_last_cycle = lstm_results_map.get((last_unit, last_cycle), [])
                     lstm_pred_last_cycle_avg = np.mean(lstm_preds_last_cycle) if lstm_preds_last_cycle else None

                     results_list.append({
                          'unit_number': last_unit,
                          'last_cycle': last_cycle,
                          'xgboost_prob_failure_last_cycle': float(xgboost_pred_last_cycle),
                          'lstm_prob_failure_last_cycle_avg': float(lstm_pred_last_cycle_avg) if lstm_pred_last_cycle_avg is not None else None
                     })

            # Return results as JSON
            return jsonify({"predictions_per_unit_last_cycle": results_list})

        except Exception as e:
            # Log the error for debugging
            print(f"An error occurred: {e}")
            return jsonify({"error": f"An internal server error occurred: {e}"}), 500
        finally:
            # Clean up the temporary file
            if os.path.exists(filepath):
                os.remove(filepath)

    return jsonify({"error": "File upload failed unexpectedly"}), 500 # Should not be reached with above checks

if __name__ == '__main__':
    # Create uploads directory if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 10000)), debug=True) # Set debug=False for production
