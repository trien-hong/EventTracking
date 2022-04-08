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
        if emailData.endswith(".com"):
            passwordData = flask.request.form["password"]
            zipData = flask.request.form["zip"]
            if zipData.isnumeric() and len(zipData)==5:
                passwordHash = generate_password_hash(passwordData, method="sha256")
                #only querying to check if email already exists in the DB
                contains_data = Users.query.filter_by(email=emailData).first()
                if contains_data is None:
                    db.session.begin()
                    insert_data = Users(emailData, passwordHash, zipData)
                    db.session.add(insert_data)
                    db.session.commit()
                    return flask.redirect(flask.url_for("login"))
            else:
                flask.flash("Zipcode should be 5 numbers. Please try again.")
                return flask.render_template("signup.html")
        else:
            flask.flash("Email needs to end in '.com'. Please try again.")
            return flask.render_template("signup.html")
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

@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    if flask.request.method == "GET":
        myList = []
        events = UserEvents.query.filter_by(email=current_user.email).all()
        for event in events:
            myList.append(ticketmaster_api.getEvents(event.eventId))
        return flask.render_template("profile.html", user=current_user.email, events=myList)

@app.route("/reroute", methods=["POST"])
@login_required
def reroute():
    if flask.request.method == "POST":
        result = flask.request.form["user_input"]
        return flask.redirect(flask.url_for("search", input=result), code=307)

@app.route("/search/<input>", methods=["GET", "POST"])
@login_required
def search(input):
    if flask.request.method == "GET":
        return flask.render_template("search.html")
    if flask.request.method == "POST":
        events = ticketmaster_api.search(input)
        if events == False:
            flask.flash("Search came up empty. Please try again.")
            return flask.render_template("search.html", input=input)
        else:
            return flask.render_template("search.html", input=input, events=events, allow="True")

@app.route("/add", methods=["POST"])
@login_required
def add():
    if flask.request.method == "POST":
        eventId = flask.request.form["eventId"]
        currentPage = flask.request.form["currentPage"]
        contains_data = UserEvents.query.filter_by(email=current_user.email, eventId=eventId).first()
        if contains_data is None:
            db.session.begin()
            insert_data = UserEvents(current_user.email, eventId)
            db.session.add(insert_data)
            db.session.commit()
            if currentPage == "index":
                return flask.redirect(flask.url_for("main"))
            elif currentPage == "search":
                url = flask.request.referrer
                split = url.split("/")
                last_search = split[-1]
                return flask.redirect(flask.url_for("search", input=last_search), code=307)
            else:
                return flask.redirect(flask.url_for("event_details"))
        else:
            flask.flash("Event has already been added to your list. Please choose another event.")
            return flask.redirect(flask.url_for("main"), code=307)

@app.route("/delete", methods=["POST"])
@login_required
def delete():
    if flask.request.method == "POST":
        eventId = flask.request.form["eventId"]
        contains_data = UserEvents.query.filter_by(email=current_user.email, eventId=eventId).first()
        if contains_data is not None:
            db.session.begin()
            UserEvents.query.filter_by(email=current_user.email, eventId=eventId).delete()
            db.session.commit()
            return flask.redirect(flask.url_for("profile"))
        else:
            return flask.redirect(flask.url_for("profile"))

@app.route("/event_details", methods=["GET", "POST"])
@login_required
def event_details():
    if flask.request.method == "GET":
        return flask.render_template("event_details.html")
    if flask.request.method == "POST":
        eventId = flask.request.form["eventId"]
        eventDetails = ticketmaster_api.getEventDetails(eventId)
        return flask.render_template("event_details.html", name=eventDetails["name"], eventImageURL=eventDetails["eventImageURL"], startDate=eventDetails["startDate"], genre=eventDetails["genre"], minPrice=eventDetails["minPrice"], maxPrice=eventDetails["maxPrice"], venue=eventDetails["venue"], address=eventDetails["address"], longitude=eventDetails["longitude"], latitude=eventDetails["latitude"], GOOGLEMAP_API_KEY=os.getenv("GOOGLEMAP_API_KEY"))

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return flask.redirect(flask.url_for("signup"))

@app.errorhandler(500)
def internal_error(error):
    return flask.redirect(flask.url_for("profile"))

if __name__ == "__main__":
    db.create_all()
    from models import Users, UserEvents

    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
    )
