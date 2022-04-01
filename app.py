import os
import flask
import ticketmaster_api
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from flask_login import (
    login_required, 
    login_user, 
    logout_user, 
    LoginManager, 
    login_manager, 
    current_user
)
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv(find_dotenv())

app = flask.Flask(__name__)
app.secret_key = os.getenv("APP_SECRET_KEY")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
if app.config["SQLALCHEMY_DATABASE_URI"].startswith("postgres://"):
    app.config["SQLALCHEMY_DATABASE_URI"] = app.config[
        "SQLALCHEMY_DATABASE_URI"
    ].replace("postgres://", "postgresql://")

db = SQLAlchemy(app, session_options={"autocommit": True})

login_manager= LoginManager(app)
login_manager.init_app(app)
login_manager.login_view= "login"

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(int(user_id))

@app.route("/")
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if flask.request.method == "GET":
        return flask.render_template("signup.html")
    if flask.request.method == "POST":
        emailData = flask.request.form["email"]
        passwordData = flask.request.form["password"]
        zipData = flask.request.form["zip"]
        passwordHash = generate_password_hash(passwordData, method="sha256")
        #only querying to check if email already exists in the DB
        contains_data = Users.query.filter_by(email=emailData).first()
        if contains_data is None: 
            db.session.begin()
            insert_data = Users(emailData, passwordHash, zipData)
            db.session.add(insert_data)
            db.session.commit()
            return flask.redirect(flask.url_for("login"))
        flask.flash("Email already exists or is incorrect. Please login instead.")    
    return flask.render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if flask.request.method == "GET":
        return flask.render_template("login.html")
    if flask.request.method == "POST":
        emailData = flask.request.form["email"]
        emailQuery = Users.query.filter_by(email=emailData).first()
        passwordData = flask.request.form["password"]
        if emailQuery is None or not check_password_hash(emailQuery.password, passwordData):
            flask.flash("Email or password is incorrect. Please try again.")
        else:
            login_user(emailQuery)
            return flask.redirect(flask.url_for("main"))
    return flask.render_template("login.html")


@app.route("/main", methods=["GET", "POST"])
@login_required
def main():
    events = ticketmaster_api.getEvents(current_user.zip)
    return flask.render_template("index.html", events=events)

@app.route("/add", methods=["POST"])
@login_required
def add():
    if flask.request.method == "POST":
        eventTitle = flask.request.form["eventTitle"]
        print(eventTitle)
        return flask.redirect(flask.url_for("main"))
    return flask.redirect(flask.url_for("main"))

@app.route("/event_details", methods=["POST"])
@login_required
def event_details():
    if flask.request.method == "POST":
        eventId = flask.request.form["eventId"]
        eventDetails = ticketmaster_api.getEventDetails(eventId)
        return flask.render_template("event_details.html", name=eventDetails["name"], eventImageURL=eventDetails["eventImageURL"], startDate=eventDetails["startDate"], genre=eventDetails["genre"], minPrice=eventDetails["minPrice"], maxPrice=eventDetails["maxPrice"], venue=eventDetails["venue"], address=eventDetails["address"])

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return flask.redirect(flask.url_for("signup"))


if __name__ == "__main__":
    db.create_all()
    from models import Users

    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
    )