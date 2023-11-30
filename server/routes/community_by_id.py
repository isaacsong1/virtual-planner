from . import request, Resource
from models.community import Community
from models.user_community import UserCommunity
from schemas.community_schema import CommunitySchema
from schemas.user_community_schema import UserCommunitySchema
from schemas.user_schema import UserSchema  #!
from schemas.post_schema import PostSchema  #!
from app_setup import db

community_schema = CommunitySchema(session=db.session)
user_community_schema = UserCommunitySchema(session=db.session)
user_schema = UserSchema(session=db.session)  #!
post_schema = PostSchema(session=db.session)  #!


class CommunityById(Resource):
    def get(self, id):
        if community := db.session.get(Community, id):
            community_schema = CommunitySchema()
            users = [user_schema.dump(u) for u in community.users]  #!
            posts = [post_schema.dump(p) for p in community.posts[0]]  #!
            return {
                "community": community_schema.dump(community),
                "users": users,
                "posts": posts,
            }, 200
            # return community_schema.dump(community), 200  #!
        return {"error": "Could not find that community"}, 404

    def patch(self, id):
        if community := db.session.get(Community, id):
            try:
                data = request.json
                # Validate data
                community_schema.validate(data)
                # Deserialize data and allow for partial updates
                updated_community = community_schema.load(
                    data, instance=community, partial=True
                )
                db.session.commit()
                # Grab UserCommunity with community id equal to our current community's id
                uc = UserCommunity.query.filter(
                    UserCommunity.community_id == id
                ).first()
                # Set user_id entry to updated owner_id
                uc_data = {"user_id": updated_community.owner_id}
                # Deserialize our new user_id into our user communities database
                user_community_schema.load(uc_data, instance=uc, partial=True)
                db.session.commit()
                # Serialize the data and package your JSON response
                return community_schema.dump(updated_community), 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {"error": "Could not find community"}, 404

    def delete(self, id):
        if community := db.session.get(Community, id):
            try:
                db.session.delete(community)
                db.session.commit()
                return {"message": f"Community {id} has been deleted"}, 200
            except Exception as e:
                db.session.rollback()
                return {"error": str(e)}, 400
        return {"error": "Could not find community"}, 404
