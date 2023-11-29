from sqlalchemy.orm import validates
import re
from models.user import User
from app_setup import db


class Todo(db.Model):
    __tablename__ = "todos"

    # Columns for todos Table
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String, nullable=False)
    status = db.Column(db.Boolean)
    day = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # relationships
    user = db.relationship("User", back_populates="todos")

    # associations

    # serializations

    # validations
    @validates("item")
    def validate_item(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Item must be a string")
        elif len(value) < 2 or len(value) > 30:
            raise ValueError(f"Item must be between 2 and 30 characters")
        return value
    
    @validates("user_id")
    def validate_userid(self, _, value):
        if not isinstance(value, int):
            raise TypeError(f"User id must be an integer")
        elif value < 1:
            raise ValueError(f"User id must be a positive integer")
        elif not db.session.get(User, value):
            raise ValueError(f"User id has to correspond to an existing user")
        return value

    def __repr__(self):
        return f"<Todo #{self.id} {self.item} />"
