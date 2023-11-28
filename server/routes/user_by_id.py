from . import request, session, make_response, abort, g, Resource, ValidationError
from models.user import User
from schemas.user_schema import UserSchema
from app import user_schema
from app_setup import api, db

# View Profile / Edit Profile Page Information
class UserById(Resource):
    def get(self, id):
        if user := db.session.get(User, id):
            user_schema = UserSchema()
            return user_schema.dump(user), 200
        return {'error': 'Could not find that user'}, 404
    
    def patch(self, id):
        if user := db.session.get(User, id):
            try:
                data = request.json
                # Validate data
                user_schema.validate(data)
                # Deserialize data and allow for partial updates
                updated_user = user_schema.load(data, instance=user, partial=True)
                db.session.commit()
                # Serialize the data and package your JSON response
                return user_schema.dump(updated_user), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'User not found'}, 404

    def delete(self, id):
        if user := db.session.get(User, id):
            try:
                db.session.delete(user)
                db.session.commit()
                return {'message': f'User {id} has been deleted'}, 204
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Could not find user'}, 404
    
api.add_resource(UserById, '/users/<int:id>')