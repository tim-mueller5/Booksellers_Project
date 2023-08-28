from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)

    cart_items = db.relationship('CartItem', backref='user', cascade='all, delete-orphan')

    serialize_rules = ('-cart_items.user',)


class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"))

    serialize_rules = ('-user.cart_items', '-book.cart_items')


class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    authors = db.Column(db.String)
    description = db.Column(db.String)
    edition = db.Column(db.String)
    format = db.Column(db.String)
    num_pages = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    genres = db.Column(db.String)
    genre_list = db.Column(db.String)
    image_url = db.Column(db.String)

    cart_items = db.relationship('CartItem', backref='book', cascade='all, delete-orphan')
    serialize_rules = ('-cart_items.book',)




    
   
