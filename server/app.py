#!/usr/bin/env python3


from flask import request, make_response, jsonify, session
from flask_restful import Resource
from config import app, db, api, bcrypt
from models import Book, User, CartItem
app.secret_key = b'\xf6\xd03L\x0fq%\xbat\xe0\x15r\x054\xbe\xcc'


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
        user_pass = User.authenticate(user, request.get_json()['password'])
        if user_pass == True:
            session['user_id'] = user.id
            return make_response(user.to_dict(rules=('-cart_items',)), 200)
        else:
            return make_response({"error": "User not found"}, 400)
    
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message': '204: No Content'}, 204)

api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

