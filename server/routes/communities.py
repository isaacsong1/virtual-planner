from . import request, session, make_response, abort, g, Resource, ValidationError
from models.community import Community
from app import community_schema
from app_setup import api, db

class Communities(Resource):
    def get(self):
        communities = community_schema.dump(Community.query)
        return communities, 200
    
    def post(self):
        try:
            data = request.json
            # Validate data
            community_schema.validate(data)
            # Deserialize the data with dump()
            new_community = community_schema.load(data)
            db.session.add(new_community)
            db.session.commit()
            # Serialize the data and package your JSON response
            serialized_community = community_schema.dump(new_community)
            return serialized_community, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
    
api.add_resource(Communities, '/communities')