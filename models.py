# pylint: disable=E1101, R0903, W0622, C0103, R0913

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
    eventId = db.Column(db.String(100), nullable=False)
    eventName = db.Column(db.String(250), nullable=False)
    eventDate = db.Column(db.String(150), nullable=False)
    eventAddress = db.Column(db.String(300), nullable=False)
    eventImageURL = db.Column(db.String(300), nullable=False)
    eventPrice = db.Column(db.String(100), nullable=False)

    def __init__(
        self,
        email,
        eventId,
        eventName,
        eventDate,
        eventAddress,
        eventImageURL,
        eventPrice,
    ):
        self.email = email
        self.eventId = eventId
        self.eventName = eventName
        self.eventDate = eventDate
        self.eventAddress = eventAddress
        self.eventImageURL = eventImageURL
        self.eventPrice = eventPrice
