from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserOut, UserUpdate, UserRoleUpdate
from app.api.deps import get_current_user,requires_roles

router = APIRouter()

@router.get("/me", response_model=UserOut)
def get_my_profile(current_user: User = Depends(get_current_user)):
    """Any authenticated user can view their own profile."""
    return current_user

@router.patch("/me", response_model=UserOut)
def update_my_profile(
    body: UserUpdate,
    db: Session = Depends(get_db),
    current_user:User = Depends(get_current_user)
):
    """Update own profile (name, phone, avatar)."""
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    return current_user

# ─────────────── Admin-only endpoints ──────────────────

@router.get("/", response_model=list[UserOut])
def list_user(
    db:Session=Depends(get_db),
    current_user:User=Depends(requires_roles("super_admin")),
):
    """Super admin can list all users."""
    return db.query(User).order_by(User.created_at.desc()).all()

@router.get("/{user_id}", response_model=UserOut)
def get_user(
    user_id:UUID,
    db:Session=Depends(get_db),
    current_user:User=Depends(requires_roles("super_admin", "gym_owner")),
):
    user=db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404,detail="User Not Found")
    return user

@router.patch("/{user_id}/role", response_model=UserOut)
def change_user_role(
    user_id: UUID,
    body:UserRoleUpdate,
    db:Session=Depends(get_db),
    current_user:User=Depends(requires_roles("super_admin")),
):
    """Only super_admin can change a user's role."""
    valid_roles = {"super_admin", "gym_owner", "trainer", "member"}
    if body.role not in valid_roles:
        raise HTTPException(status_code=400, detail=f"Inavlid role,  Must be one of: {valid_roles}")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User Not found")
    
    user.role = body.role
    db.commit()
    db.refresh(user)
    return user


@router.patch("/{user_id}/deactivate", response_model=UserOut)
def deactivate_user(
    user_id: UUID,
    db:Session=Depends(get_db),
    current_user: User=Depends(requires_roles("super_admin")),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = False
    db.commit()
    db.refresh(user)
    return user
