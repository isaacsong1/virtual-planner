from . import validates, re
from app_setup import db


class Community(db.Model):
    __tablename__ = "communities"

    # Columns for communities Table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # relationships
    #! owner (user_id alias)

    # associations

    # serializations

    # validations
    # here is my random comment!!!
    # this is really hidden!!

    def __repr__(self):
        return f"<Community #{self.id} {self.name} />"
