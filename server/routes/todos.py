from . import request, Resource
from models.todo import Todo
from schemas.todo_schema import TodoSchema
from app_setup import db

todo_schema = TodoSchema(session=db.session)
todos_schema = TodoSchema(many=True, session=db.session)

class Todos(Resource):
    def get(self):
        todos = todos_schema.dump(Todo.query)
        return todos, 200

    def post(self):
        try:
            data = request.json
            #validate data
            todo_schema.validate(data)
            #deserialize with load()
            new_todo = todo_schema.load(data)
            #add new todo to todo table
            db.session.add(new_todo)
            db.session.commit()
            #serialize with dump()
            serialized_todo = todo_schema.dump(new_todo)
            return serialized_todo, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400
