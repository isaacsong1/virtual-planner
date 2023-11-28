from . import request, session, make_response, abort, g, Resource, ValidationError
from models.community import Community
from schemas.community_schema import CommunitySchema
from app import community_schema
from app_setup import api, db

class CommunityById(Resource):
    def get(self, id):
        if community := db.session.get(Community, id):
            community_schema = CommunitySchema()
            return community_schema.dump(community), 200
        return {'error': 'Could not find that community'}, 404
    
    def patch(self, id):
        if community := db.session.get(Community, id):
            try:
                data = request.json
                # Validate data
                community_schema.validate(data)
                # Deserialize data and allow for partial updates
                updated_community = community_schema.load(data, instance=community, partial=True)
                db.session.commit()
                # Serialize the data and package your JSON response
                return community_schema.dump(updated_community), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Could not find community'}, 404

    def delete(self, id):
        if community := db.session.get(Community, id):
            try:
                db.session.delete(community)
                db.session.commit()
                return {'message': f'Community {id} has been deleted'}, 204
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Could not find community'}, 404

    
api.add_resource(CommunityById, '/communities/<int:id>')