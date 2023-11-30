from . import request, session, Resource
from schemas.user_schema import UserSchema
from schemas.journal_schema import JournalSchema
from app_setup import db

user_schema = UserSchema(session=db.session)
journal_schema = JournalSchema(session=db.session)

class Register(Resource):
    def post(self):
        try:
            # Get user input data
            data = {"username": request.json.get('username'), 'email': request.json.get('email')}
            # Validate user information
            user_schema.validate(data)
            # Create new user schema
            new_user = user_schema.load(data)
            # Hash password
            new_user.password_hash = request.json.get('password')
            db.session.add(new_user)
            db.session.commit()
            journal_data = {'user_id': new_user.id}
            new_journal = journal_schema.load(journal_data)
            db.session.add(new_journal)
            db.session.commit()
            # Add user id to cookies
            session['user_id'] = new_user.id
            serialized_user = user_schema.dump(new_user)
            return serialized_user, 201
        except Exception as e:
            db.session.delete(new_user)
            db.session.commit()
            return {'error': str(e)}, 400
