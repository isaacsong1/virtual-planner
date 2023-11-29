from marshmallow import fields, validate, validates, ValidationError
from models.entry import Entry
from app_setup import ma


class EntrySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Entry
        load_instance = True
        fields = ['id', 'entry', 'journal_id']

    entry = fields.String(validate=validate.Length(min=3, max=3000))
