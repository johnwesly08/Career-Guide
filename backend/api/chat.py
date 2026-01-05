from fastapi import APIRouter
from datetime import datetime
from services.chat_handler import chat_with_user
from db import user_stats
from api.schemas import ChatRequest

router = APIRouter()

async def update_chat_stats(user_id: str):
    await user_stats.update_one(
        {"_id": user_id},
        {
            "$inc": {"chatCount": 1},
            "$set": {"updatedAt": datetime.utcnow()}
        },
        upsert=True
    )

@router.post("/chat")
async def chat_endpoint(chat: ChatRequest):
    response = chat_with_user(chat.message, chat.session_id)

    await update_chat_stats(chat.user_id)

    return {"response": response}
