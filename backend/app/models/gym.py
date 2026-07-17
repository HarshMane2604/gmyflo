import uuid
from datetime import timezone, datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class Gym(Base):
    __tablename__="gyms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    address = Column(Text, nullable=True)
    phone = Column(String(20), nullable=True)
    logo_url = Column(String(512), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # ── Relationships ──
    owner = relationship("User", back_populates="owned_gyms")
    memberships = relationship("GymMembership", back_populates="gym",cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Gym {self.name}>"