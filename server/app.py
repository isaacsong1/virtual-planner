#!/usr/bin/env python3

# Standard library imports

# Local imports
from app_setup import app, db, ma, api

# Model imports
# from models.user import User
# from schemas.user_schema import UserSchema
# from models.community import Community
# from schemas.community_schema import CommunitySchema
# from models.entry import Entry
# from schemas.entry_schema import EntrySchema
# from models.post import Post
# from schemas.post_schema import PostSchema
# from models.todo import Todo
# 
# from models.user_community import UserCommunity
# from models.journal import Journal

# Route imports
from routes.users import Users
from routes.user_by_id import UserById
from routes.communities import Communities
from routes.community_by_id import CommunityById
from routes.register import Register
from routes.todos import Todos
from routes.user_communities import UserCommunities
from routes.journal_by_id import JournalById
from routes.entries import Entries
from routes.posts import Posts
from routes.post_by_id import PostById

# Schemas


# entry_schema = EntrySchema(session=db.session)
# entries_schema = EntrySchema(many=True, session=db.session)
# post_schema = PostSchema(session=db.session)
# posts_schema = PostSchema(many=True, session=db.session)
# todo_schema = TodoSchema(session=db.session)
# todos_schema = TodoSchema(many=True, session=db.session)

# Add resources
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Communities, '/communities')
api.add_resource(CommunityById, '/communities/<int:id>')
api.add_resource(Register, '/register')
api.add_resource(Todos, '/todos')
api.add_resource(JournalById, '/journal/<int:id>')
# api.add_resource(Entries, '/journal/<int:id>')
api.add_resource(Posts, '/communities/<int:id>/posts')
api.add_resource(PostById, '/posts/<int:id>')



# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
