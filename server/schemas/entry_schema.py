from marshmallow import fields, validate, validates, ValidationError
from models.entry import Entry
from app_setup import ma
from schemas.journal_schema import JournalSchema


class EntrySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Entry
        load_instance = True
        fields = ["id", "entry", "journal_id", "journal"]

    journal = fields.Nested(JournalSchema)
    entry = fields.String(validate=validate.Length(min=3, max=3000))
