from marshmallow import fields, validate, validates, ValidationError
from models.community import Community
from schemas.user_community_schema import UserCommunitySchema
from app_setup import ma


class CommunitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Community
        load_instance = True
        fields = ["id", "name", "description", "owner_id", "user_communities"]

    name = fields.String(required=True, validate=validate.Length(min=2, max=80))
    description = fields.String(validate=validate.Length(min=3, max=500))
    user_communities = fields.List(fields.Nested(UserCommunitySchema))
