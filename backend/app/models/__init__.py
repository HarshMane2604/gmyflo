# Import all models here so Alembic and Base.metadata.create_all() can discover them
from app.models.user import User
from app.models.oauth_account import OAuthAccount
from app.models.refresh_token import RefreshToken
from app.models.gym import Gym
from app.models.gym_membership import GymMembership

__all__ = ["User", "OAuthAccount", "RefreshToken", "Gym", "GymMembership"]