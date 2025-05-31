# processing.py
import pandas as pd
import numpy as np

# Define the original column names and feature list used
COLUMN_NAMES = [
    'unit_number', 'time_in_cycles', 'op_setting_1', 'op_setting_2', 'op_setting_3',
    'sensor_1', 'sensor_2', 'sensor_3', 'sensor_4', 'sensor_5',
    'sensor_6', 'sensor_7', 'sensor_8', 'sensor_9', 'sensor_10',
    'sensor_11', 'sensor_12', 'sensor_13', 'sensor_14', 'sensor_15',
    'sensor_16', 'sensor_17', 'sensor_18', 'sensor_19', 'sensor_20', 'sensor_21'
]

FEATURE_COLS_XGBOOST = ['op_setting_1', 'op_setting_2', 'op_setting_3', 'sensor_1', 'sensor_2', 'sensor_3', 'sensor_4', 'sensor_6', 'sensor_7', 'sensor_8', 'sensor_9', 'sensor_10', 'sensor_11', 'sensor_12', 'sensor_13', 'sensor_14', 'sensor_15', 'sensor_16', 'sensor_17', 'sensor_20', 'sensor_21', 'sensor_1_roll_mean_w10', 'sensor_1_roll_std_w10', 'sensor_1_diff', 'sensor_2_roll_mean_w10', 'sensor_2_roll_std_w10', 'sensor_2_diff', 'sensor_3_roll_mean_w10', 'sensor_3_roll_std_w10', 'sensor_3_diff', 'sensor_4_roll_mean_w10', 'sensor_4_roll_std_w10', 'sensor_4_diff', 'sensor_5_roll_mean_w10', 'sensor_5_roll_std_w10', 'sensor_5_diff', 'sensor_6_roll_mean_w10', 'sensor_6_roll_std_w10', 'sensor_6_diff', 'sensor_7_roll_mean_w10', 'sensor_7_roll_std_w10', 'sensor_7_diff', 'sensor_8_roll_mean_w10', 'sensor_8_roll_std_w10', 'sensor_8_diff', 'sensor_9_roll_mean_w10', 'sensor_9_roll_std_w10', 'sensor_9_diff', 'sensor_10_roll_mean_w10', 'sensor_10_roll_std_w10', 'sensor_10_diff', 'sensor_11_roll_mean_w10', 'sensor_11_roll_std_w10', 'sensor_11_diff', 'sensor_12_roll_mean_w10', 'sensor_12_roll_std_w10', 'sensor_12_diff', 'sensor_13_roll_mean_w10', 'sensor_13_roll_std_w10', 'sensor_13_diff', 'sensor_14_roll_mean_w10', 'sensor_14_roll_std_w10', 'sensor_14_diff', 'sensor_15_roll_mean_w10', 'sensor_15_roll_std_w10', 'sensor_15_diff', 'sensor_16_roll_mean_w10', 'sensor_16_roll_std_w10', 'sensor_17_roll_mean_w10', 'sensor_17_roll_std_w10', 'sensor_17_diff', 'sensor_18_roll_mean_w10', 'sensor_18_roll_std_w10', 'sensor_18_diff', 'sensor_20_roll_mean_w10', 'sensor_20_roll_std_w10', 'sensor_20_diff', 'sensor_21_roll_mean_w10', 'sensor_21_roll_std_w10', 'sensor_21_diff', 'sensor_1_lag_1', 'sensor_2_lag_1', 'sensor_3_lag_1', 'sensor_4_lag_1', 'sensor_6_lag_1', 'sensor_7_lag_1', 'sensor_8_lag_1', 'sensor_9_lag_1', 'sensor_10_lag_1', 'sensor_11_lag_1', 'sensor_12_lag_1', 'sensor_13_lag_1', 'sensor_14_lag_1', 'sensor_15_lag_1', 'sensor_16_lag_1', 'sensor_17_lag_1', 'sensor_20_lag_1', 'sensor_21_lag_1', 'sensor_1_lag_2', 'sensor_2_lag_2', 'sensor_3_lag_2', 'sensor_4_lag_2', 'sensor_6_lag_2', 'sensor_7_lag_2', 'sensor_8_lag_2', 'sensor_9_lag_2', 'sensor_10_lag_2', 'sensor_11_lag_2', 'sensor_12_lag_2', 'sensor_13_lag_2', 'sensor_14_lag_2', 'sensor_15_lag_2', 'sensor_17_lag_2', 'sensor_20_lag_2', 'sensor_21_lag_2', 'sensor_1_lag_3', 'sensor_2_lag_3', 'sensor_3_lag_3', 'sensor_4_lag_3', 'sensor_6_lag_3', 'sensor_7_lag_3', 'sensor_8_lag_3', 'sensor_9_lag_3', 'sensor_10_lag_3', 'sensor_11_lag_3', 'sensor_12_lag_3', 'sensor_13_lag_3', 'sensor_14_lag_3', 'sensor_15_lag_3', 'sensor_16_lag_3', 'sensor_17_lag_3', 'sensor_20_lag_3', 'sensor_21_lag_3', 'sensor_6_zscore', 'sensor_7_zscore', 'sensor_13_zscore', 'sensor_14_zscore', 'sensor_21_zscore']
FEATURE_COLS_LSTM = ['op_setting_1', 'op_setting_2', 'op_setting_3', 'sensor_1', 'sensor_2', 'sensor_3', 'sensor_4', 'sensor_6', 'sensor_7', 'sensor_8', 'sensor_9', 'sensor_10', 'sensor_11', 'sensor_12', 'sensor_13', 'sensor_14', 'sensor_15', 'sensor_16', 'sensor_17', 'sensor_20', 'sensor_21', 'sensor_1_roll_mean_w10', 'sensor_1_roll_std_w10', 'sensor_1_diff', 'sensor_2_roll_mean_w10', 'sensor_2_roll_std_w10', 'sensor_2_diff', 'sensor_3_roll_mean_w10', 'sensor_3_roll_std_w10', 'sensor_3_diff', 'sensor_4_roll_mean_w10', 'sensor_4_roll_std_w10', 'sensor_4_diff', 'sensor_5_roll_mean_w10', 'sensor_5_roll_std_w10', 'sensor_5_diff', 'sensor_6_roll_mean_w10', 'sensor_6_roll_std_w10', 'sensor_6_diff', 'sensor_7_roll_mean_w10', 'sensor_7_roll_std_w10', 'sensor_7_diff', 'sensor_8_roll_mean_w10', 'sensor_8_roll_std_w10', 'sensor_8_diff', 'sensor_9_roll_mean_w10', 'sensor_9_roll_std_w10', 'sensor_9_diff', 'sensor_10_roll_mean_w10', 'sensor_10_roll_std_w10', 'sensor_10_diff', 'sensor_11_roll_mean_w10', 'sensor_11_roll_std_w10', 'sensor_11_diff', 'sensor_12_roll_mean_w10', 'sensor_12_roll_std_w10', 'sensor_12_diff', 'sensor_13_roll_mean_w10', 'sensor_13_roll_std_w10', 'sensor_13_diff', 'sensor_14_roll_mean_w10', 'sensor_14_roll_std_w10', 'sensor_14_diff', 'sensor_15_roll_mean_w10', 'sensor_15_roll_std_w10', 'sensor_15_diff', 'sensor_16_roll_mean_w10', 'sensor_16_roll_std_w10', 'sensor_17_roll_mean_w10', 'sensor_17_roll_std_w10', 'sensor_17_diff', 'sensor_18_roll_mean_w10', 'sensor_18_roll_std_w10', 'sensor_18_diff', 'sensor_20_roll_mean_w10', 'sensor_20_roll_std_w10', 'sensor_20_diff', 'sensor_21_roll_mean_w10', 'sensor_21_roll_std_w10', 'sensor_21_diff', 'sensor_1_lag_1', 'sensor_2_lag_1', 'sensor_3_lag_1', 'sensor_4_lag_1', 'sensor_6_lag_1', 'sensor_7_lag_1', 'sensor_8_lag_1', 'sensor_9_lag_1', 'sensor_10_lag_1', 'sensor_11_lag_1', 'sensor_12_lag_1', 'sensor_13_lag_1', 'sensor_14_lag_1', 'sensor_15_lag_1', 'sensor_16_lag_1', 'sensor_17_lag_1', 'sensor_20_lag_1', 'sensor_21_lag_1', 'sensor_1_lag_2', 'sensor_2_lag_2', 'sensor_3_lag_2', 'sensor_4_lag_2', 'sensor_6_lag_2', 'sensor_7_lag_2', 'sensor_8_lag_2', 'sensor_9_lag_2', 'sensor_10_lag_2', 'sensor_11_lag_2', 'sensor_12_lag_2', 'sensor_13_lag_2', 'sensor_14_lag_2', 'sensor_15_lag_2', 'sensor_17_lag_2', 'sensor_20_lag_2', 'sensor_21_lag_2', 'sensor_1_lag_3', 'sensor_2_lag_3', 'sensor_3_lag_3', 'sensor_4_lag_3', 'sensor_6_lag_3', 'sensor_7_lag_3', 'sensor_8_lag_3', 'sensor_9_lag_3', 'sensor_10_lag_3', 'sensor_11_lag_3', 'sensor_12_lag_3', 'sensor_13_lag_3', 'sensor_14_lag_3', 'sensor_15_lag_3', 'sensor_16_lag_3', 'sensor_17_lag_3', 'sensor_20_lag_3', 'sensor_21_lag_3', 'sensor_6_zscore', 'sensor_7_zscore', 'sensor_13_zscore', 'sensor_14_zscore', 'sensor_21_zscore']
# Update this list based on the actual features used by your trained LSTM model
# If you removed features with zero importance, update this list accordingly.

WINDOW_SIZE = 10
LAG_VALUES = [1, 2, 3]

def load_and_engineer_features(csv_filepath):
    """
    Loads the CSV, performs feature engineering and handles missing values.
    """
    try:
        df = pd.read_csv(csv_filepath, delim_whitespace=True, header=None, names=COLUMN_NAMES)
    except Exception as e:
        raise ValueError(f"Error loading or parsing CSV: {e}")

    feature_cols_raw = [col for col in df.columns if 'sensor_' in col]

    features_to_concat = []

    # Rolling mean and std
    for col in feature_cols_raw:
        # Ensure handling for units with fewer than WINDOW_SIZE cycles
        roll_mean = df.groupby('unit_number')[col].transform(lambda x: x.rolling(WINDOW_SIZE, min_periods=1).mean())
        roll_std = df.groupby('unit_number')[col].transform(lambda x: x.rolling(WINDOW_SIZE, min_periods=1).std())
        diff = df.groupby('unit_number')[col].diff()

        features_to_concat.extend([
            roll_mean.rename(f'{col}_roll_mean_w{WINDOW_SIZE}'),
            roll_std.rename(f'{col}_roll_std_w{WINDOW_SIZE}'),
            diff.rename(f'{col}_diff')
        ])

    # Lag features
    for lag in LAG_VALUES:
        for col in feature_cols_raw:
            lagged = df.groupby('unit_number')[col].shift(lag)
            features_to_concat.append(lagged.rename(f'{col}_lag_{lag}'))

    # Z-score features
    # Note: This z-score calculation uses the overall mean and std.
    # If you used a different scaling (e.g., unit-wise), adjust here.
    for col in feature_cols_raw:
        zscore = (df[col] - df[col].mean()) / (df[col].std() + 1e-6) # Add small epsilon to avoid division by zero
        features_to_concat.append(zscore.rename(f'{col}_zscore'))


    # Combine all features
    new_features_df = pd.concat(features_to_concat, axis=1)
    df_engineered = pd.concat([df, new_features_df], axis=1)

    # Handle NaNs (same logic as in your notebook)
    cols_with_potential_nans = [f'{col}_diff' for col in feature_cols_raw] + [f'{col}_roll_std_w{WINDOW_SIZE}' for col in feature_cols_raw]
    for col_name in cols_with_potential_nans:
         if col_name in df_engineered.columns:
             df_engineered[col_name] = df_engineered.groupby('unit_number')[col_name].transform(
                 lambda x: x.bfill().ffill()
             )
    df_engineered.fillna(0, inplace=True) # Final fillna with 0

    return df_engineered

def create_lstm_sequences(df, sequence_length, feature_columns):
    """
    Creates sequences for the LSTM model from the engineered data.
    Assumes df has 'unit_number' and the feature_columns.
    Returns sequences (numpy array) and corresponding unit numbers and cycles
    to help map predictions back.
    """
    sequences = []
    unit_cycle_info = [] # Store (unit_number, time_in_cycles) for each sequence

    for unit in df['unit_number'].unique():
        unit_df = df[df['unit_number'] == unit].copy().sort_values(by='time_in_cycles') # Ensure sorted
        unit_features = unit_df[feature_columns].values

        # Create sequences (overlapping)
        for i in range(len(unit_features) - sequence_length + 1):
            sequences.append(unit_features[i:i+sequence_length])
            # Store the unit and cycle info for the LAST cycle of the sequence
            last_cycle_info = unit_df[['unit_number', 'time_in_cycles']].iloc[i+sequence_length-1]
            unit_cycle_info.append(tuple(last_cycle_info.values))

    return np.array(sequences), unit_cycle_info