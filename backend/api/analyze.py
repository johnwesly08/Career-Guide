from fastapi import APIRouter, UploadFile, File, Form
from datetime import datetime
from services.resume_parser import extract_text_from_resume
from services.embedding_engine import get_embeddings
from services.llm_analyzer import generate_analysis
from db import user_stats

router = APIRouter()

async def update_analyze_stats(user_id: str, score: float):
    await user_stats.update_one(
        {"_id": user_id},
        {
            "$inc": {
                "jobsAnalyzed": 1,
                "totalScore": score
            },
            "$set": {
                "updatedAt": datetime.utcnow()
            }
        },
        upsert=True
    )

@router.post("/analyze")
async def analyze_job_resume(
    resume: UploadFile = File(...),
    job_desc: str = Form(...),
    user_id: str = Form(...)
):
    resume_text = await extract_text_from_resume(resume)
    embeddings = get_embeddings(resume_text, job_desc)
    analysis = generate_analysis(resume_text, job_desc, embeddings)

    await update_analyze_stats(user_id, analysis["overallScore"])

    return analysis
