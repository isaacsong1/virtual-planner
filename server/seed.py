#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app_setup import app, db
from models.community import Community
from models.entry import Entry
from models.journal import Journal
from models.post import Post
from models.todo import Todo
from models.user_community import UserCommunity
from models.user import User


if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed code goes here!
        print("Clearing db...")
        Community.query.delete()
        Entry.query.delete()
        Journal.query.delete()
        Post.query.delete()
        Todo.query.delete()
        UserCommunity.query.delete()
        User.query.delete()

        print("Seeding users...")
        users = []
        for i in range(4):
            users.append(
                User(
                    username=fake.first_name(),
                    _password_hash=fake.first_name(),
                    location=fake.first_name(),
                    bio=fake.first_name(),
                    interests=fake.first_name(),
                )
            )

        db.session.add_all(users)
        db.session.commit()

        print("Seeding todos...")
        todos = []
        for u in users:
            todos.append(Todo(item=fake.first_name(), status=False, day=0, user_id=4))
        db.session.add_all(todos)
        db.session.commit()

        print("Seeding journals...")
        journals = []
        for u in User.query:
            journals.append(Journal(user_id=u.id))
        db.session.add_all(journals)
        db.session.commit()

        print("Seeding entries...")
        entries = []
        for j in Journal.query:
            entries.append(Entry(date=fake.date_time(), entry=fake.first_name(), journal_id=j.id))
        db.session.add_all(entries)
        db.session.commit()

        print("Seeding communities...")
        communities = []
        for i in range(4):
            communities.append(Community(name=fake.first_name(), description=fake.first_name(), owner_id=4))
        db.session.add_all(communities)
        db.session.commit()

        print("Seeding user_communities...")
        user_communities = [
            UserCommunity(user_id=users[1].id, community_id=communities[1].id),
            UserCommunity(user_id=users[2].id, community_id=communities[2].id),
            UserCommunity(user_id=users[3].id, community_id=communities[3].id),
            UserCommunity(user_id=users[0].id, community_id=communities[0].id),
            UserCommunity(user_id=users[0].id, community_id=communities[0].id),
            UserCommunity(user_id=users[1].id, community_id=communities[1].id),
            UserCommunity(user_id=users[2].id, community_id=communities[2].id),
            UserCommunity(user_id=users[3].id, community_id=communities[3].id),
        ]
        db.session.add_all(user_communities)
        db.session.commit()

        print("Seeding posts...")
        posts = []
        for u in user_communities:
            uc = rc(user_communities)
            posts.append(
                Post(
                    title=fake.first_name(),
                    content=fake.first_name(),
                    user_communities_id=uc.id,
                )
            )
        db.session.add_all(posts)
        db.session.commit()

        print("Done seeding!")
