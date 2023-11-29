from . import request, Resource
from models.journal import Journal
from schemas.journal_schema import JournalSchema
from models.entry import Entry
from schemas.entry_schema import EntrySchema
from app_setup import db
from datetime import datetime

journal_schema = JournalSchema(session=db.session)
entry_schema = EntrySchema(session=db.session)
# entries_schema = EntrySchema(many=True, session=db.session)

class JournalById(Resource):
    def get(self, id):
        if journal := db.session.get(Journal, id):
            entries = [entry_schema.dump(e) for e in journal.entries]
            return entries, 200
        return {'error': 'Could not find that journal'}, 404
    
    def post(self, id):
        if journal := db.session.get(Journal, id):
            latest_entry_id = max([e.id for e in journal.entries])
            latest_entry = db.session.get(Entry, latest_entry_id)
            try:
                data = request.json
                entry_schema.validate(data)
                data['journal_id'] = id
                new_entry = entry_schema.load(data)
                db.session.add(new_entry)
                db.session.commit()
                if latest_entry.date.day == new_entry.date.day and latest_entry.date.month == new_entry.date.month and latest_entry.date.year == new_entry.date.year:
                    db.session.delete(new_entry)
                    db.session.commit()
                    return {'error': 'A journal entry already exists for today'}, 400
                else: 
                    serialized_entry = entry_schema.dump(new_entry)
                    return serialized_entry, 201
            except Exception as e:
                return {'error': str(e)}, 400
        return {'error': 'Journal not found'}, 404
        
    def patch(self, id):
        if journal := db.session.get(Journal, id):
            latest_entry_id = max([e.id for e in journal.entries])
            latest_entry = db.session.get(Entry, latest_entry_id)
            if latest_entry.date.month == datetime.now().month and latest_entry.date.day == datetime.now().day:
                try:
                    data = request.json
                    entry_schema.validate(data)
                    updated_entry = entry_schema.load(data, instance=latest_entry)
                    db.session.commit()
                    return entry_schema.dump(updated_entry), 200
                except Exception as e:
                    return {'error': str(e)}, 400
            else:
                return {'message': 'You cannot update an old entry'}, 400
        return {'error': 'Journal not found'}, 404


    
