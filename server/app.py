#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api

# Model imports
from models.user import User
from schemas.user_schema import UserSchema

# Schemas
user_schema = UserSchema(session=db.session)
users_schema = UserSchema(many=True, session=db.session)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

