from . import request, Resource
from models.todo import Todo
from schemas.todo_schema import TodoSchema
from app_setup import db

todos_schema = TodoSchema(many=True, session=db.session)

class TodoById(Resource):
    def patch(self, id):
        pass

    def delete(self, id):
        pass