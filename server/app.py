#!/usr/bin/env python3


from flask import request, make_response, jsonify
from flask_restful import Resource
from config import app, db, api
from models import Book


@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'

class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        return make_response(books, 200)

    def post(self, id):
        try:
            data = request.get_json()
            new_book = Book(
                title = data['title'],
                authors = data['title'],
                description = data['title'],
                edition = data['title'],
                format = data['title'],
                num_pages = data['title'],
                rating = data['title'],
                genres = data['title'],
                image_url = data['title']
            )
            db.session.add(new_book)
            db.session.commit()
            return make_response(new_book, 201)
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)

