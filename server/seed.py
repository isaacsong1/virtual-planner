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
        hobbies = [
            "hiking",
            "running",
            "reading",
            "writing",
            "fishing",
            "video games",
            "cooking",
        ]
        users = []
        for i in range(10):
            u = User(
                username=fake.name(),
                email=fake.email(),
                location=fake.address(),
                bio=fake.sentence(),
                interests=rc(hobbies),
            )
            u.password_hash = fake.first_name()
            users.append(u)
            db.session.add(u)
        db.session.commit()

        print("Seeding todos...")
        chores = [
            "do laundry",
            "clean house",
            "code",
            "run errands",
            "call mom",
            "run 5 miles",
            "meal prep",
        ]
        days = [0, 1, 2, 3, 4, 5, 6]
        todos = []
        for u in users:
            for i in range(5):
                todos.append(
                    Todo(item=rc(chores), status=False, day=rc(days), user_id=u.id)
                )
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
            for i in range(5):
                entries.append(
                    Entry(
                        date=fake.date_time(),
                        entry=fake.paragraph(nb_sentences=6),
                        journal_id=j.id,
                    )
                )
        db.session.add_all(entries)
        db.session.commit()

        print("Seeding user_communities...")
        communities = []
        user_communities = []
        for u in users:
            for i in range(2):
                communities.append(
                    Community(
                        name=fake.catch_phrase(),
                        description=fake.paragraph(nb_sentences=2),
                        owner_id=u.id,
                    )
                )
                user_communities.append(
                    UserCommunity(user_id=u.id, community_id=len(communities))
                )
        db.session.add_all(communities)
        db.session.commit()
        for u in users:
            for i in range(4):
                com = rc(communities)
                user_communities.append(
                    UserCommunity(user_id=u.id, community_id=com.id)
                )
        db.session.add_all(user_communities)
        db.session.commit()

        print("Seeding posts...")
        posts = []
        for u in user_communities:
            for i in range(8):
                uc = rc(user_communities)
                posts.append(
                    Post(
                        title=fake.catch_phrase(),
                        content=fake.paragraph(nb_sentences=3),
                        user_communities_id=uc.id,
                    )
                )
        db.session.add_all(posts)
        db.session.commit()

        print("Done seeding!")
