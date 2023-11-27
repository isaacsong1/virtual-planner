from sqlalchemy.orm import validates
import re
from app_setup import db


class Journal(db.Model):
    __tablename__ = "journals"

    # Columns for journals Table
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # relationships
    user = db.relationship("User", back_populates="journals", cascade="all, cascade-orphan")

    # associations
    entries = db.relationship("Entry", back_populates="entries")

    # validations

    def __repr__(self):
        return f"<Journal #{self.id} />"
