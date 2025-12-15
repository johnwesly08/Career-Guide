import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Extend path so imports from 'api' work correctly
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import router from api.routes
from api.routes import router

app = FastAPI(
    title="Career Compass API",
    version="1.0.0",
    description="API backend for resume analysis and chat features"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include versioned API router
app.include_router(router, prefix="/api/v1")

# Health check route
@app.get("/")
def health_check():
    return {"status": "Career Compass API is running"}
