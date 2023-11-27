from sqlalchemy.orm import validates
import re
from app_setup import db
from sqlalchemy.ext.associationproxy import association_proxy


class Community(db.Model):
    __tablename__ = "communities"

    # Columns for communities Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))

    # relationships
    user_communities = db.relationship("UserCommunity", back_populates = "communities")
    owner = db.relationship("User", back_populates="community")

    # associations
    users = association_proxy("user_communities", "user")

    # validations
    @validates("name")
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"{value} must be a string")
        elif len(value) < 2 or len(value) > 20:
            raise ValueError(f"{value} must be between 2 and 20 characters")
        return value


    def __repr__(self):
        return f"<Community #{self.id} {self.name} />"
