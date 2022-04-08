# pylint: disable=E1101, R0903

"""
SWE Final Project | Event Tracking
"""

from flask_login import UserMixin
from app import db


class Users(db.Model, UserMixin):
    """
    Users table for our database
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    zip = db.Column(db.String(5), nullable=False)

    def __init__(self, email, password, zipcode):
        self.email = email
        self.password = password
        self.zipcode = zipcode


class UserEvents(db.Model):
    """
    UserEvents table for our database
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    event_id = db.Column(db.String(100), nullable=False)

    def __init__(self, email, event_id):
        self.email = email
        self.event_id = event_id
