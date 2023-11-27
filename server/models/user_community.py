from . import validates, re
from app_setup import db


class UserCommunity(db.Model):
    __tablename__ = "user_communities"

    # Columns for user_communities Table
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    community_id = db.Column(db.Integer, db.ForeignKey("communities.id"))

    # relationships
    #! user_id
    #! community_id

    # associations

    # serializations

    # validations

    def __repr__(self):
        return f"<UserCommunity #{self.id} />"
