from sqlalchemy.orm import validates
import re
from app_setup import db
from .user import User


class Journal(db.Model):
    __tablename__ = "journals"

    # Columns for journals Table
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # relationships
    user = db.relationship("User", back_populates="journals", cascade="all, delete-orphan")

    # associations
    entries = db.relationship("Entry", back_populates="entries")

    # validations
    @validates("user_id")
    def validate_user_id(self, _, value):
        if not isinstance(value, int):
            raise TypeError(f"{value} must be an integer")
        elif value < 1:
            raise ValueError(f"{value} must be a positive integer")
        elif not db.session.get(User, value):
            raise ValueError(f"{value} has to correspond to an existing user")
        return value

    def __repr__(self):
        return f"<Journal #{self.id} />"
