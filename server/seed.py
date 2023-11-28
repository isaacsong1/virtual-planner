#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db
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
                    username=fake.name(),
                    password=fake.name(),
                    location=fake.name(),
                    bio=fake.name(),
                    interests=[fake.name()],
                )
            )

        db.session.add_all(users)

        print("Seeding todos...")
        todos = []
        for u in users:
            todos.append(Todo(item=fake.name(), status=False, day=0))
        db.session.add_all(todos)

        print("Seeding journals...")
        journals = []
        for u in users:
            journals.append(Journal(u.get("user_id")))
        db.session.add_all(journals)

        print("Seeding entries...")
        entries = []
        for j in journals:
            entries.append(Entry(date=fake.date(), entry=fake.name()))
        db.session.add_all(entries)

        print("Seeding communities...")
        communities = []
        for i in range(4):
            communities.append(Community(name=fake.name(), description=fake.name()))
        db.session.add_all(communities)

        print("Seeding user_communities...")
        user_communities = [
            UserCommunity(users[1].get("user_id"), communities[1].get("community_id")),
            UserCommunity(users[2].get("user_id"), communities[2].get("community_id")),
            UserCommunity(users[3].get("user_id"), communities[3].get("community_id")),
            UserCommunity(users[0].get("user_id"), communities[0].get("community_id")),
            UserCommunity(users[0].get("user_id"), communities[0].get("community_id")),
            UserCommunity(users[1].get("user_id"), communities[1].get("community_id")),
            UserCommunity(users[2].get("user_id"), communities[2].get("community_id")),
            UserCommunity(users[3].get("user_id"), communities[3].get("community_id")),
        ]
        db.session.add_all(user_communities)

        print("Seeding posts...")
        posts = []
        for u in user_communities:
            uc = rc(user_communities).get("user_communities_id")
            posts.append(
                Post(
                    title=fake.name(),
                    content=fake.name(),
                    user_communities_id=uc,
                )
            )
        db.session.add_all(posts)

        print("Done seeding!")
