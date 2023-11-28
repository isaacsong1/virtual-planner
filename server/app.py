#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from app_setup import app, db, ma, api

# Model imports
from models.user import User
from schemas.user_schema import UserSchema
from models.community import Community
from schemas.community_schema import CommunitySchema
from models.entry import Entry
from schemas.entry_schema import EntrySchema
from models.post import Post
from schemas.post_schema import PostSchema
from models.todo import Todo
from schemas.todo_schema import TodoSchema
from models.user_community import UserCommunity
from models.journal import Journal

# Schemas
user_schema = UserSchema(session=db.session)
users_schema = UserSchema(many=True, session=db.session)
community_schema = CommunitySchema(session=db.session)
communities_schema = CommunitySchema(many=True, session=db.session)
entry_schema = EntrySchema(session=db.session)
entries_schema = EntrySchema(many=True, session=db.session)
post_schema = PostSchema(session=db.session)
posts_schema = PostSchema(many=True, session=db.session)
todo_schema = TodoSchema(session=db.session)
todos_schema = TodoSchema(many=True, session=db.session)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)
