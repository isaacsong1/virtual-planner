from sqlalchemy.orm import validates
import re
from app_setup import db
from sqlalchemy.ext.hybrid import hybrid_property
from app_setup import bcrypt
from sqlalchemy.ext.associationproxy import association_proxy
from .user_community import UserCommunity


class User(db.Model):
    __tablename__ = "users"

    # Columns for users Table
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    location = db.Column(db.String)
    bio = db.Column(db.String)
    interests = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    #relationships
    journal = db.relationship("Journal", back_populates="user", cascade="all, delete-orphan")
    todos = db.relationship("Todo", back_populates="user", cascade = "all, delete-orphan")
    user_communities = db.relationship("UserCommunity", back_populates="user", cascade="all, delete-orphan")
    community = db.relationship("Community", back_populates="owner", cascade="all, delete-orphan")
    #association
    # communities = association_proxy('user_communities', 'community')
    communities = association_proxy('user_communities', 'community', creator=lambda community_obj: UserCommunity(community=community_obj))

    #validations
    @validates("username")
    def validate_username(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Username must be a string")
        elif len(value) < 3 or len(value) > 20:
            raise ValueError(f"Username must be between 3 and 20 characters")
        return value

    @validates("email")
    def validate_email(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Email must be a string")
        elif len(value) < 2 or len(value) > 256:
            raise ValueError(f"Email must be between 2 and 256 characters")
        return value
    
    @validates("bio")
    def validate_bio(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Bio must be a string")
        elif len(value) < 2 or len(value) > 100:
            raise ValueError(f"Bio must be between 5 and 100 characters")
        return value

    @validates("interests")
    def validate_interests(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Interests must be a string")
        elif len(value) < 2 or len(value) > 20:
            raise ValueError(f"Interests must be between 1 and 5 items")
        return value

    @hybrid_property
    def password_hash(self):
        raise AttributeError("No peeking at the password...")

    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return bcrypt.check_password_hash(self._password_hash, password_to_check)

    def __repr__(self):
        return f"<User #{self.id} {self.username} />"
