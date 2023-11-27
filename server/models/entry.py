from . import validates, re
from app_setup import db


class Entry(db.Model):
    __tablename__ = "entries"

    # Columns for entries Table
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, server_default=db.func.now())
    entry = db.Column(db.String, nullable=False)
    journal_id = db.Column(db.Integer, db.ForeignKey("journals.id"))

    # relationships
    #! journal_id

    # associations

    # serializations

    # validations

    def __repr__(self):
        return f"<Entry #{self.id} {self.date} />"
