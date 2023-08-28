#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import requests
import json 

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Book, User, CartItem

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        print("Deleting data...")
        Book.query.delete()
        User.query.delete()
        CartItem.query.delete()

        print("Fetching books...")
        res = requests.get('https://example-data.draftbit.com/books?_limit=200')
        response = json.loads(res.text)


        print("Creating Books...")
        for book in response:
            new_book = Book(
                title = book['title'],
                authors = book['authors'],
                description = book['description'],
                edition = book['edition'],
                format = book['format'],
                num_pages = book['num_pages'],
                rating = book['rating'],
                genres = book['genres'],
                image_url = book['image_url']
            )
            db.session.add(new_book)
            db.session.commit()


        print('Creating User...')
        user = User(username='Tim')
        db.session.add(user)
        db.session.commit()

        print('Creating cart...')
        new_cart_item = CartItem(user_id=user.id, book_id=15)
        db.session.add(new_cart_item)
        db.session.commit()

        print("Seeding done!")
