from flask_login import UserMixin
from app import db


class Users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    zip = db.Column(db.String(5), nullable=False)

    def __init__(self, email, password, zip):
        self.email = email
        self.password = password
        self.zip = zip

class UserEvents(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    eventId = db.Column(db.String(100), nullable=False)

    def __init__(self, email, eventId):
        self.email = email
        self.eventId = eventId