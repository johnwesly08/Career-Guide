import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer

# Initialize Firebase Admin ONLY ONCE
cred = credentials.Certificate("firebase-service-account.json")

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

security = HTTPBearer()

def verify_token(token=Depends(security)):
    try:
        decoded_token = auth.verify_id_token(token.credentials)
        return decoded_token
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
