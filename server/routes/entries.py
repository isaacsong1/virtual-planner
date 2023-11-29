from . import request, Resource
from models.entry import Entry
from schemas.entry_schema import EntrySchema
from app_setup import db

entry_schema = EntrySchema(session=db.session)
entries_schema = EntrySchema(many=True, session=db.session)

class Entries(Resource):
    def post(self):
        try:
            data = request.json
            entry_schema.validate(data)
            new_entry = entry_schema.load(data)
            import ipdb; ipdb.set_trace()
            db.session.add(new_entry)
            db.session.commit()
        except Exception as e:
            return {'error': str(e)}, 400