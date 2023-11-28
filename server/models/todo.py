from sqlalchemy.orm import validates
import re
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
    user = db.relationship("User", back_populates="todos", cascade = "all, delete-orphan")

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

    def __repr__(self):
        return f"<Todo #{self.id} {self.item} />"
