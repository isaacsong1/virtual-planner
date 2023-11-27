from . import validates, re
from app_setup import db


class Post(db.Model):
    __tablename__ = "posts"

    # Columns for posts Table
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    user_communities_id = db.Column(db.Integer, db.ForeignKey("user_communities.id"))

    # relationships
    #! user_communities_id

    # associations

    # serializations

    # validations

    def __repr__(self):
        return f"<Post #{self.id} {self.title} />"
