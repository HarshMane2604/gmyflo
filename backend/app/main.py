from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models  import *
from app.config import settings
from app.api.routers import auth, user

# ── Create tables (use Alembic in production instead) ──
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.API_VERSION,
    docs_url = "/docs",
    redoc_url = "/redoc"
)

# ── CORS ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ── routers ──
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(user.router, prefix="/user", tags=["User"])


@app.get("/health")
def health_check():
    return {"status": "healthy", "app": settings.APP_NAME}
    
@app.get("/")
def read_root():
    return {"status": "Backend is running!"}

@app.get("/api/message")
def read_message():
    return {"message": "Backend connected to frontend babe"}

@app.get("/gym")
def get_gym_data():
    return {
        "status": "success",
        "data": {
            "name": "GymFlo Active Members",
            "count": 2450
        }
    }