from marshmallow import fields, validate, validates, ValidationError
from models.community import Community
from app_setup import ma


class CommunitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Community
        load_instance = True

    name = fields.String(required=True, validate=validate.Length(min=2, max=20))
    description = fields.String(validate=validate.Length(min=5, max=100))
