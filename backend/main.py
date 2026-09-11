from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import mock_db

app = FastAPI(title="SIH Food Packaging AI Prototype API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FoodAnalyzeRequest(BaseModel):
    food_query: str

class RecommendationRequest(BaseModel):
    food_name: str
    food_profile: Dict[str, Any]
    user_requirements: Dict[str, Any]
    transportation: Dict[str, Any]

@app.get("/")
def read_root():
    return {"message": "FastAPI is running. SIH Prototype Backend."}

@app.post("/api/analyze-food")
def analyze_food(request: FoodAnalyzeRequest):
    query = request.food_query.lower().strip()
    
    # Try to find exactly
    if query in mock_db.MOCK_FOOD_PROFILES:
        return mock_db.MOCK_FOOD_PROFILES[query]
    
    # Simple matching
    for key, profile in mock_db.MOCK_FOOD_PROFILES.items():
        if query in key or key in query:
             return profile
            
    # Default to Tomato if not found for demo purposes
    return mock_db.MOCK_FOOD_PROFILES["tomato"]

@app.post("/api/recommend")
def recommend_packaging(request: RecommendationRequest):
    query = request.food_name.lower().strip()
    
    # Try to find exactly
    recs = None
    if query in mock_db.MOCK_RECOMMENDATIONS:
        recs = mock_db.MOCK_RECOMMENDATIONS[query]
    else:
        # Default to tomato
        recs = mock_db.MOCK_RECOMMENDATIONS["tomato"]
        
    return recs

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
