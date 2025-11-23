"""
RiderGuy Analytics Service
Machine Learning models for demand forecasting, ETA prediction, fraud detection
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
from datetime import datetime
import joblib
import os

app = FastAPI(title="RiderGuy Analytics Service")

# Models (loaded on startup)
demand_model = None
eta_model = None
fraud_model = None

class DemandPredictionRequest(BaseModel):
    location: dict
    datetime: str
    features: Optional[dict] = {}

class ETAPredictionRequest(BaseModel):
    pickup_location: dict
    delivery_location: dict
    rider_id: str
    vehicle_type: str
    current_traffic: Optional[float] = 1.0

class FraudDetectionRequest(BaseModel):
    rider_id: str
    transaction_amount: float
    transaction_type: str
    location: dict
    timestamp: str
    features: dict

@app.on_event("startup")
async def load_models():
    """Load ML models on startup"""
    global demand_model, eta_model, fraud_model
    
    # In production, load from cloud storage or model registry
    try:
        if os.path.exists("models/demand_model.pkl"):
            demand_model = joblib.load("models/demand_model.pkl")
        if os.path.exists("models/eta_model.pkl"):
            eta_model = joblib.load("models/eta_model.pkl")
        if os.path.exists("models/fraud_model.pkl"):
            fraud_model = joblib.load("models/fraud_model.pkl")
    except Exception as e:
        print(f"Model loading error: {e}")

@app.get("/")
def health_check():
    return {
        "service": "analytics-service",
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "language": "Python",
        "framework": "FastAPI"
    }

@app.post("/api/analytics/demand/predict")
async def predict_demand(request: DemandPredictionRequest):
    """Predict demand for a specific location and time"""
    
    if demand_model is None:
        # Fallback to heuristic
        hour = datetime.fromisoformat(request.datetime).hour
        
        # Peak hours heuristic
        if 7 <= hour <= 9 or 17 <= hour <= 19:
            predicted_demand = np.random.randint(15, 25)
        elif 11 <= hour <= 14:
            predicted_demand = np.random.randint(10, 15)
        else:
            predicted_demand = np.random.randint(3, 8)
    else:
        # Use trained model
        features = prepare_demand_features(request)
        predicted_demand = demand_model.predict([features])[0]
    
    return {
        "success": True,
        "predicted_demand": int(predicted_demand),
        "location": request.location,
        "datetime": request.datetime,
        "confidence": 0.85
    }

@app.post("/api/analytics/eta/predict")
async def predict_eta(request: ETAPredictionRequest):
    """Predict ETA for a delivery"""
    
    # Calculate distance (Haversine)
    distance_km = haversine(
        request.pickup_location["lat"],
        request.pickup_location["lng"],
        request.delivery_location["lat"],
        request.delivery_location["lng"]
    )
    
    if eta_model is None:
        # Heuristic: 30 km/h average speed adjusted for traffic and vehicle
        vehicle_speeds = {
            "motorcycle": 35,
            "bicycle": 15,
            "car": 40,
            "scooter": 25,
            "van": 35
        }
        
        base_speed = vehicle_speeds.get(request.vehicle_type, 30)
        adjusted_speed = base_speed / request.current_traffic
        
        eta_minutes = (distance_km / adjusted_speed) * 60
    else:
        features = prepare_eta_features(request, distance_km)
        eta_minutes = eta_model.predict([features])[0]
    
    return {
        "success": True,
        "eta_minutes": round(eta_minutes, 1),
        "distance_km": round(distance_km, 2),
        "confidence": 0.82
    }

@app.post("/api/analytics/fraud/detect")
async def detect_fraud(request: FraudDetectionRequest):
    """Detect fraudulent activity"""
    
    risk_score = 0.0
    flags = []
    
    # Rule-based checks
    if request.transaction_amount > 10000:
        risk_score += 0.3
        flags.append("high_amount")
    
    if request.transaction_type == "withdrawal" and request.transaction_amount > 5000:
        risk_score += 0.2
        flags.append("large_withdrawal")
    
    # Time-based checks
    hour = datetime.fromisoformat(request.timestamp).hour
    if hour < 5 or hour > 23:
        risk_score += 0.1
        flags.append("unusual_time")
    
    # Location-based checks
    if request.features.get("location_change_km", 0) > 100:
        risk_score += 0.2
        flags.append("unusual_location")
    
    if fraud_model is not None:
        features = prepare_fraud_features(request)
        ml_risk_score = fraud_model.predict_proba([features])[0][1]
        risk_score = (risk_score + ml_risk_score) / 2
    
    is_fraudulent = risk_score > 0.7
    
    return {
        "success": True,
        "is_fraudulent": is_fraudulent,
        "risk_score": round(risk_score, 3),
        "flags": flags,
        "action": "block" if is_fraudulent else "allow"
    }

@app.get("/api/analytics/insights/rider/{rider_id}")
async def get_rider_insights(rider_id: str):
    """Get behavioral insights for a rider"""
    
    # In production, query from feature store
    return {
        "rider_id": rider_id,
        "performance_score": 0.87,
        "predicted_churn_probability": 0.15,
        "suggested_actions": [
            "Offer bonus for completing 5 more deliveries this week",
            "Recommend advanced training module"
        ],
        "peak_hours": ["08:00-10:00", "17:00-19:00"],
        "preferred_areas": ["Downtown", "East District"]
    }

def haversine(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculate distance between two coordinates in km"""
    from math import radians, cos, sin, asin, sqrt
    
    lng1, lat1, lng2, lat2 = map(radians, [lng1, lat1, lng2, lat2])
    
    dlng = lng2 - lng1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
    c = 2 * asin(sqrt(a))
    
    km = 6371 * c
    return km

def prepare_demand_features(request):
    """Prepare features for demand prediction model"""
    dt = datetime.fromisoformat(request.datetime)
    return [
        request.location["lat"],
        request.location["lng"],
        dt.hour,
        dt.weekday(),
        dt.month
    ]

def prepare_eta_features(request, distance_km):
    """Prepare features for ETA prediction model"""
    return [
        distance_km,
        request.current_traffic,
        1 if request.vehicle_type == "motorcycle" else 0,
        request.pickup_location["lat"],
        request.pickup_location["lng"]
    ]

def prepare_fraud_features(request):
    """Prepare features for fraud detection model"""
    return [
        request.transaction_amount,
        1 if request.transaction_type == "withdrawal" else 0,
        request.features.get("location_change_km", 0),
        request.features.get("transaction_count_24h", 0),
        request.features.get("account_age_days", 0)
    ]

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 3012))
    uvicorn.run(app, host="0.0.0.0", port=port)
