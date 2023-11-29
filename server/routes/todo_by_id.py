from . import request, Resource
from models.todo import Todo
from schemas.todo_schema import TodoSchema
from app_setup import db

todo_schema = TodoSchema(session=db.session)
todos_schema = TodoSchema(many=True, session=db.session)

class TodoById(Resource):
    def patch(self, id):
        if todo:= db.session.get(Todo, id):
            try:
                data = request.json
                #validate data
                todo_schema.validate(data)
                #deserialize
                updated_todo = todo_schema.load(data, instance=todo, partial=True)
                db.session.commit()
                return todo_schema.dump(updated_todo), 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Todo not found'}, 404

    def delete(self, id):
        if todo:= db.session.get(Todo, id):
            try:
                db.session.delete(todo)
                db.session.commit()
                return {'message': f'Todo {id} has been deleted'}, 200
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 400
        return {'error': 'Could not find todo'}, 404
