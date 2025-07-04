# Predictive-Maintenance-for-Satellite-Systems
## Develop systems that predict satellite component failures to make proactive decisions and extend mission life.


### Functions
* Monitors satellite sensor and telemetry data

* Classifies fault types in real-time

* Predicts Remaining Useful Life (RUL) of key components

* Assists ground control in scheduling timely maintenance or preventive actions

## Technologies Used
* Python, NumPy, Pandas

* Scikit-learn, XGBoost, Keras (TensorFlow backend)

* Optuna for hyperparameter tuning

* SHAP for explainability

* Matplotlib, Seaborn for visualization

## Performance Metrics
* Fault Classification Accuracy: 91%

* Precision / Recall: 0.89 / 0.93

* F1 Score: 0.91

* RUL Prediction MAE: 6.2 cycles

* Inference Time: ~0.18 seconds (real-time capable)

* Reliability Score: 94% across 30 simulated missions

## Dataset
We used publicly available simulated datasets adapted from NASA’s C-MAPSS (Commercial Modular Aero-Propulsion System Simulation) and modified it to reflect satellite operational patterns and environmental conditions.

## Key Features
* Early warning system for potential satellite failures

* Component-level fault type classification

* Estimation of remaining operational life

* Lightweight and fast — suitable for onboard or ground station integration

* Transparent decision-making using SHAP explainability


###Clone this repo

git clone https://github.com/your-team-name/satellite-predictive-maintenance.git

###Install dependencies

* pip install -r requirements.txt

Run training & inference

* python train_model.py

* python predict_rul.py

View results

* Plots will be saved in /results

* Metrics will be logged to console

## Applications & Impact
* Satellite fleet management

* Defense and surveillance systems

* Commercial satellite providers (e.g. Starlink, OneWeb)

* Space missions — both manned and unmanned

* Reduces downtime and mission costs by enabling smart maintenance

