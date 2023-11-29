from marshmallow import fields, validate, validates, ValidationError
from models.journal import Journal
from app_setup import ma

class JournalSchema(ma.SQLAlchemySchema):
    class Meta():
        model = Journal
        load_instance = True
        fields = ['id', 'user_id']

    
