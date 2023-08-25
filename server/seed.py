#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Book

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        print("Deleting data...")
        Book.query.delete()

        print("Creating Books...")
        book = Book(title = "A title")
        db.session.add(book)
        db.session.commit()

        print("Seeding done!")
