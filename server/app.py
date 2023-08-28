#!/usr/bin/env python3


from flask import request, make_response, jsonify
from flask_restful import Resource
from config import app, db, api
from models import Book, User, CartItem


@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        return make_response(books, 200)

    def post(self):
        try:
            data = request.get_json()
            new_book = Book(
                title = data['title'],
                authors = data['authors'],
                description = data['description'],
                edition = data['edition'],
                format = data['format'],
                num_pages = data['num_pages'],
                rating = data['rating'],
                genres = data['genres'],
                image_url = data['image_url']
            )
            db.session.add(new_book)
            db.session.commit()
            return make_response(new_book.to_dict(), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(Books, '/books')

class BookById(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            return make_response({"error": "book not found"}, 404)
        return make_response(book.to_dict(), 200)
    
api.add_resource(BookById, '/books/<int:id>')

class CartItems(Resource):
    def post(self):
        new_cart_item = CartItem(
            user_id = request.get_json()["user_id"],
            book_id = request.get_json()["book_id"]
        )
        db.session.add(new_cart_item)
        db.session.commit()
        return make_response(new_cart_item.to_dict(rules=("-book","-user")), 201)

api.add_resource(CartItems, '/cart_items')

class CartItemsByUserId(Resource):
    def get(self, user_id):
        items = [item.to_dict(rules=("-book","-user")) for item in CartItem.query.filter_by(user_id=user_id).all()]
        return make_response(items, 200)
    
api.add_resource(CartItemsByUserId, '/cart_items/<int:user_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

