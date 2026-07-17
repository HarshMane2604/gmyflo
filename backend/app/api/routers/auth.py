import hashlib
from datetime import timezone, datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models.user import User
from app.models.oauth_account import OAuthAccount
from app.models.refresh_token import RefreshToken
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse, RefreshResponse, RefreshRequest
from app.services.auth_service import (
    hash_password, verify_password, create_access_token, create_refresh_token, decode_refresh_token, decode_access_token
)
from app.services.google_oauth import get_google_auth_url, exchange_google_code

router = APIRouter()


# ─────────────────────── helpers ───────────────────────

def _hash_token(raw: str) -> str:
    return hashlib.sha256(raw.encode()).hexdigest()

def _store_refresh_token(db: Session, user_id, raw_token: str):
    entry = RefreshToken(
        user_id=user_id,
        token_hash=_hash_token(raw_token),
        expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )
    db.add(entry)
    db.commit()

def _issue_tokens(db:Session, user:User)-> TokenResponse:
    access = create_access_token(user.id, user.role)
    refresh = create_refresh_token(user.id)
    _store_refresh_token(db, user.id, refresh)
    return TokenResponse(access_token=access, refresh_token=refresh, role=user.role)

# ─────────────────── email / password ──────────────────

@router.post("/register", response_model=TokenResponse)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail= "email already registered")
        

    user = User(
        email=body.email,
        password_hash=hash_password(body.password),
        full_name=body.full_name,
        phone=body.phone,
        role=body.role if body.role else "member"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return _issue_tokens(db, user)

@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not user.password_hash or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= "Account disabled")
    
    return _issue_tokens(db, user)

# ─────────────────── token refresh ─────────────────────

@router.post("/refresh", response_model=TokenResponse)
def refresh_token(body: RefreshRequest, db: Session = Depends(get_db)):
    try:
        payload = decode_refresh_token(body.refresh_token)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    token_hash = _hash_token(body.refresh_token)
    stored = (
        db.query(RefreshToken)
        .filter(RefreshToken.token_hash == token_hash, RefreshToken.revoked.is_(False))
        .first()
    )
    if not stored:
        raise HTTPException(status_code=401, detail="Refresh token not found or revoked")
    
    stored.revoked = True
    db.commit()

    user = db.query(User).filter(User.id == payload["sub"]).first()
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found or disabled")

    return _issue_tokens(db, user)

# ─────────────────────── logout ────────────────────────

@router.post("/logout")
def logout(body: RefreshRequest, db: Session = Depends(get_db)):
    token_hash = _hash_token(body.refresh_token)
    stored = db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).first()

    if stored:
        stored.revoked = True
        db.commit()
    
    return {"message": "Logged out successfully"}

# ─────────────────── Google OAuth ──────────────────────

@router.get("/google/login")
def google_login():
    """Returns the Google consent screen URL for the frontend to redirect to."""
    return {"url" : get_google_auth_url()}

@router.get("/google/callback")
async def google_callback(code:str, db: Session = Depends(get_db)):
    """
    Google redirects here after user consents.
    Creates or links account, then redirects to frontend with tokens.
    """
    try:
        google_user = await exchange_google_code(code)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to exchange Google code")
    
    # Check if this Google account is already linked

    oauth = (
        db.query(OAuthAccount)
        .filter(
            OAuthAccount.provider == "google",
            OAuthAccount.provider_user_id == google_user["sub"]
        )
        .first()
    )

    if oauth:
        user = oauth.user
    else:
        # Check if email already exists (link Google to existing account)
        user = db.query(User).filter(User.email == google_user["email"]).first()
        if not user:
            user = User(
                email = google_user["email"],
                full_name=google_user.get("name", ""),
                avatar_url=google_user.get("picture"),
                is_verified=True,
                role = "member"
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        db.add(OAuthAccount(
            user_id=user.id,
            provider="google",
            provider_user_id=google_user["sub"],
        ))
        db.commit()
    
    tokens = _issue_tokens(db, user)

    # Redirect to frontend callback page with tokens as query params
    redirect_url = (
        f"{settings.FRONTEND_URL}/auth/callback"
        f"?access_token={tokens.access_token}"
        f"&refresh_token{tokens.refresh_token}"
    )

    return RedirectResponse(url=redirect_url)
        
    