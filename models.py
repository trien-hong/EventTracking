# pylint: disable=E1101, R0903, W0622

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

    def __init__(self, email, password, zip):
        self.email = email
        self.password = password
        self.zip = zip


class UserEvents(db.Model):
    """
    UserEvents table for our database
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    event_id = db.Column(db.String(100), nullable=False)

    def __init__(self, email, eventid):
        self.email = email
        self.eventid = eventid
