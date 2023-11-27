from . import fields, validate
from models.todo import Todo
from app_setup import ma


class TodoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Todo
        load_instance = True

    item = fields.String(required=True, validate=validate.Length(min=2, max=30))
    status = fields.Boolean(required=True)
    day = fields.Integer(required=True, validate=validate.Range(min=0, max=6))
