from fastapi import APIRouter
from api.analyze import router as analyze_router
from api.chat import router as chat_router
from api.dashboard import router as dashboard_router

router = APIRouter()

router.include_router(analyze_router)
router.include_router(chat_router)
router.include_router(dashboard_router)
