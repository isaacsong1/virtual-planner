from . import validates, re
from app_setup import db


class Journal(db.Model):
    __tablename__ = "journals"

    # Columns for journals Table
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # relationships
    #! user_id

    # associations

    # serializations

    # validations

    def __repr__(self):
        return f"<Journal #{self.id} />"
