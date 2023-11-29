from . import request, Resource
from models.todo import Todo
from schemas.todo_schema import TodoSchema
from app_setup import db

todos_schema = TodoSchema(many=True, session=db.session)

class Todos(Resource):
    def get(self):
        todos = todos_schema.dump(Todo.query)
        return todos, 200

    def post(self):
        pass