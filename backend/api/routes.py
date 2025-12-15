from core.firebase import verify_token
from fastapi import APIRouter, UploadFile, File, Form, Depends
from pydantic import BaseModel
from services.resume_parser import extract_text_from_resume
from services.embedding_engine import get_embeddings
from services.llm_analyzer import generate_analysis
from services.chat_handler import chat_with_user

# router = APIRouter(
#     dependencies=[Depends(verify_token)]
# )

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"

@router.get("/secure")
async def secure_endpoint(user=Depends(verify_token)):
    return {
        "message": "Access granted",
        "uid": user["uid"],
        "email": user.get("email")
    }

@router.post("/analyze")
async def analyze_job_resume(
    resume: UploadFile = File(...),
    job_desc: str = Form(...)
):
    resume_text = await extract_text_from_resume(resume)
    embeddings = get_embeddings(resume_text, job_desc)
    analysis = generate_analysis(resume_text, job_desc, embeddings)
    return analysis

@router.post("/chat")
async def chat_endpoint(chat: ChatRequest):
    response = chat_with_user(chat.message, chat.session_id)
    return {
        "response" : response
    }