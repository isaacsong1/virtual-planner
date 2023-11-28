from . import request, session, make_response, abort, g, Resource, ValidationError
from models.user import User
from app import user_schema
from app_setup import api, db

# Display Users in Community
class Users(Resource):
    def get(self):
        users = user_schema.dump(User.query)
        return users, 200
    
api.add_resource(Users, '/users')