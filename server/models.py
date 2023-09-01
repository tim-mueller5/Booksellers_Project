from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable=False)

    cart_items = db.relationship('CartItem', backref='user', cascade='all, delete-orphan')

    serialize_rules = ('-cart_items.user',)
    serialize_only = ('id', 'username')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('username')
    def validate_username(self, key, username):
        user = User.query.filter_by(username=username).first()
        if user:
            raise ValueError("Username already exists")
        else:
            return username
        
    # @property
    # def _password_hash(self):
    #     raise AttributeError('password is not a readable attribute')
    
    # def get_password_hash(self):
    #     return self._password_hash


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
    review_count = db.Column(db.Integer)
    edition = db.Column(db.String)
    format = db.Column(db.String)
    num_pages = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    genres = db.Column(db.String)
    image_url = db.Column(db.String)

    cart_items = db.relationship('CartItem', backref='book', cascade='all, delete-orphan')
    serialize_rules = ('-cart_items.book',)




    
   
