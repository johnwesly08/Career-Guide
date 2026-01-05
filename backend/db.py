from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not found in environment variables")

client = AsyncIOMotorClient(MONGO_URI)

db = client["career_compass"]
user_stats = db["user_stats"]

print("MongoDB connected")