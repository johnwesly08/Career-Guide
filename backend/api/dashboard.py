from fastapi import APIRouter
from db import user_stats

router = APIRouter()

@router.get("/dashboard/{user_id}")
async def get_dashboard_stats(user_id: str):
    doc = await user_stats.find_one({"_id": user_id})

    if not doc:
        return {
            "jobsAnalyzed": 0,
            "chatCount": 0,
            "averageScore": None
        }

    jobs = doc.get("jobsAnalyzed", 0)
    total = doc.get("totalScore", 0)

    return {
        "jobsAnalyzed": jobs,
        "chatCount": doc.get("chatCount", 0),
        "averageScore": round(total / jobs, 2) if jobs > 0 else None
    }
