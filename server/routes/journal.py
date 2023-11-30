from . import request, Resource
from models.journal import Journal
from schemas.journal_schema import JournalSchema
from app_setup import db

journals_schema = JournalSchema(many = True, session=db.session)


class Journals(Resource):
    def get(self):
        journals = Journal.query.all()
        try:
          journals = journals_schema.dump(Journal.query)
          return journals, 200
        except Exception as e:
          return str(e)
