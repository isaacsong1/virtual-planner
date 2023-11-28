from sqlalchemy.orm import validates
import re
from app_setup import db
from sqlalchemy.ext.associationproxy import association_proxy
# from .user import User


class Community(db.Model):
    __tablename__ = "communities"

    # Columns for communities Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))

    # relationships
    user_communities = db.relationship("UserCommunity", back_populates = "community", cascade="all, delete-orphan")
    owner = db.relationship("User", back_populates="community")

    # associations
    users = association_proxy("user_communities", "user")

    # validations
    @validates("name")
    def validate_name(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Name must be a string")
        elif len(value) < 2 or len(value) > 20:
            raise ValueError(f"Name must be between 2 and 20 characters")
        return value

    @validates("description")
    def validate_description(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Description must be a string")
        elif len(value) < 3 or len(value) > 100:
            raise ValueError(f"Description must be between 3 and 100 characters")
        return value

    # @validates("owner_id")
    # def validate_owner_id(self, _, value):
    #     if not isinstance(value, int):
    #         raise TypeError(f"{value} must be an integer")
    #     elif value < 1:
    #         raise ValueError(f"{value} must be a positive integer")
    #     elif not db.session.get(User, value):
    #         raise ValueError(f"{value} has to correspond to an existing user")
    #     return value


    def __repr__(self):
        return f"<Community #{self.id} {self.name} />"
