import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, ForeignKey, UniqueConstraint, CheckConstraint, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
class GymMembership(Base):
    __tablename__= "gym_memberships"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    gym_id = Column(UUID(as_uuid=True), ForeignKey("gyms.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20), nullable=False)
    joined_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    # ── Relationships ──
    user = relationship("User", back_populates="gym_memberships")
    gym = relationship("Gym", back_populates="memberships")

    __table_args__ = (
        UniqueConstraint("user_id","gym_id", name="uq_user_gym"),
        CheckConstraint("role In ('trainer', 'member')", name="valid_membership_role")
    )

    def __repr__(self):
        return f"<GymMembership user={self.user_id} gym={self.gym_id} role={self.role}>"