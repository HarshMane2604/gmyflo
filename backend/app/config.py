from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
import os

class Settings(BaseSettings):
    APP_NAME: str = "GymFlo"
    DEBUG: bool = True
    API_VERSION:str = "V1"
    FRONTEND_URL: str
    BACKEND_URL: str

    # ── Database ──
    DATABASE_URL: str

    # ── JWT ──
    JWT_SECRET: str
    JWT_REFRESH_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES : int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # ── Google OAuth ──
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    GOOGLE_REDIRECT_URI: str
    
     # ── CORS ──
    CORS_ORIGIN: list[str] = ["http://localhost:3000"]

    model_config = SettingsConfigDict(env_file=".env.development", env_file_encoding="utf-8", extra="ignore")

settings = Settings()