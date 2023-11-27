from marshmallow import fields, validate, validates, ValidationError
from models.entry import Entry
from app_setup import ma


class EntrySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Entry
        load_instance = True

    entry = fields.String(validate=validate.Length(min=3, max=3000))
