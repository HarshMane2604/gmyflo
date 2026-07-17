from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone :Optional[str] = None
    role:Optional[str] = "member" # only super_admin should override this

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: str

class RefreshResponse(BaseModel):
    refresh_token: str

class RefreshRequest(BaseModel):
    refresh_token: str