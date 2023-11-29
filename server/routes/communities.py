from . import request, Resource
from models.community import Community
from schemas.community_schema import CommunitySchema
from schemas.user_community_schema import UserCommunitySchema
from app_setup import db

community_schema = CommunitySchema(session=db.session)
communities_schema = CommunitySchema(many=True, session=db.session)
user_community_schema = UserCommunitySchema(session=db.session)

class Communities(Resource):
    def get(self):
        communities = communities_schema.dump(Community.query)
        return communities, 200
    
    def post(self):
        try:
            data = request.json
            # Validate data
            community_schema.validate(data)
            # Deserialize the data with dump()
            new_community = community_schema.load(data)
            # Add new community to communities table and assign ID 
            db.session.add(new_community)
            db.session.commit()
            # Initialize new data object with community id and owner id
            uc_data = {'community_id': new_community.id, 'user_id':data.get('owner_id')}
            if not uc_data['user_id']:
                db.session.delete(new_community)
                db.session.commit()
                return {'message': 'Community needs an owner'}, 400
            else:
                new_uc = user_community_schema.load(uc_data)
                # Add new user_community to user_communities table with our new data object
                db.session.add(new_uc)
                db.session.commit()
                # Serialize the data and package your JSON response
                serialized_community = community_schema.dump(new_community)
                return serialized_community, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
    
