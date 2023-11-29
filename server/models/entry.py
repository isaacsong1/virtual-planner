from sqlalchemy.orm import validates
import re
from app_setup import db
# from .journal import Journal


class Entry(db.Model):
    __tablename__ = "entries"

    # Columns for entries Table
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, server_default=db.func.now())
    entry = db.Column(db.String, nullable=False)
    journal_id = db.Column(db.Integer, db.ForeignKey("journals.id"))

    # relationships
    journal = db.relationship("Journal", back_populates="entries")

    # validations
    # @validates("date")
    # def validate_date(self, _, value):
    #     if self.date.day == value.day and self.date.month == value.month and self.date.year == value.year:
    #         import ipdb; ipdb.set_trace()
    #         return value
    #     raise ValueError('Only one entry allowed')
    
    @validates("entry")
    def validate_entry(self, _, value):
        if not isinstance(value, str):
            raise TypeError(f"Entry must be a string")
        elif len(value) < 3 or len(value) > 3000:
            raise ValueError(f"Entry must be between 3 and 3000 characters")
        return value

    # @validates("journal_id")
    # def validate_journal_id(self, _, value):
    #     if not isinstance(value, int):
    #         raise TypeError(f"{value} must be an integer")
    #     elif value < 1:
    #         raise ValueError(f"{value} must be a positive integer")
    #     elif not db.session.get(Journal, value):
    #         raise ValueError(f"{value} has to correspond to an existing journal")
    #     return value

    def __repr__(self):
        return f"<Entry #{self.id} {self.date} />"
