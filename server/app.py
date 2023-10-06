#!/usr/bin/env python3
from dotenv import load_dotenv
load_dotenv()

from flask import request, make_response, jsonify, session, render_template
from flask_restful import Resource
from config import app, db, api
from models import Book, User, CartItem
app.secret_key = b'\xf6\xd03L\x0fq%\xbat\xe0\x15r\x054\xbe\xcc'


@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

class Books(Resource):
    def get(self):
        filtered_books = []
        books = [book.to_dict(rules=('-cart_items',)) for book in Book.query.all()]
        filtered_books = sorted(books, key=lambda x:x['review_count'], reverse=True)
        return make_response(filtered_books[:15], 200)
    
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

class BooksByFilter(Resource):
    def get(self, search_term):
        search_term = search_term.lower()
        books = [book.to_dict() for book in Book.query.all()]
        filtered_books = []

        if search_term == 'featured':
            for book in books:
                if book["rating"] > 4.4:
                    filtered_books.append(book)
                    filtered_books = sorted(filtered_books, key=lambda x:x['rating'], reverse=True)
        elif search_term == 'title':
            filtered_books = sorted(books, key=lambda x:x['title'])
        elif search_term == 'authors':
            filtered_books = sorted(books, key=lambda x:x['authors'])
        else:
            for book in books:
                if search_term in book["genres"].lower():
                    filtered_books.append(book)

        return make_response(filtered_books, 200)
    
api.add_resource(BooksByFilter, '/books/<search_term>')

class BookById(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            return make_response({"error": "book not found"}, 404)
        return make_response(book.to_dict(rules=('-cart_items',)), 200)
    
    def patch(self, id):
        book = Book.query.filter_by(id=id).first()
        if not book:
            return make_response({"error": "book not found"}, 404)
        data = request.get_json()
        for key in data:
            setattr(book, key, data[key])
        db.session.add(book)
        db.session.commit()
        return make_response(book.to_dict(rules=('-cart_items',)), 200)
    
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
        items = [item.to_dict() for item in CartItem.query.filter_by(user_id=user_id).all()]
        return make_response(items, 200)
    
api.add_resource(CartItemsByUserId, '/cart_items/<int:user_id>')

class CartItemByItemId(Resource):
    def delete(self, id):
        cart_item = CartItem.query.filter_by(id=id).first()
        if not cart_item:
            return make_response({"error": "Item not found"}, 404)
        db.session.delete(cart_item)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(CartItemByItemId, '/cart_items/<int:id>')

class Users(Resource):
    def get(self):
        users = [user.to_dict(rules=('-cart_items',)) for user in User.query.all()]
        return make_response(users, 200)
    
    def post(self):
        try:
            new_user = User(
                username = request.get_json()["username"],
                password_hash = request.get_json()["password"]
            )
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(rules=('-cart_items',)), 201)
        except ValueError as e:
            return make_response({"error": str(e)}, 400)
    
api.add_resource(Users, '/users')

class UserById(Resource):
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        data = request.get_json()
        for key in data:
            if data[key] != '':
                if key == "password":
                    key = "password_hash"
                    setattr(user, key, data["password"])
                else:
                    setattr(user, key, data[key])

        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(rules=('-cart_items',)), 200)
        

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(UserById, '/users/<int:id>')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return make_response(user.to_dict(rules=('-cart_items',)), 200)
        else:
            return make_response({'message': '401: Not Authorized'}, 401)

api.add_resource(CheckSession, '/check_session')

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.get_json()['username']).first()
        if user:
            user_pass = User.authenticate(user, request.get_json()['password'])
        else:
            return make_response({"error": "User not found"}, 400)
        if user_pass == True:
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('-cart_items',)), 200)
        else:
            return make_response({"error": "Username or password incorrect"}, 400)
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': '204: No Content'}, 204)

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

