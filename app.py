# pylint: disable=E1101, W1508

"""
SWE Final Project
"""
import os
import flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from flask_login import (
    login_required,
    login_user,
    logout_user,
    LoginManager,
    login_manager,
    current_user,
)
from werkzeug.security import generate_password_hash, check_password_hash
import ticketmaster_api

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

login_manager = LoginManager(app)
login_manager.init_app(app)
login_manager.login_view = "login"


@login_manager.user_loader
def load_user(user_id):
    """
    The load user function is used to load the user.
    """
    return Users.query.get(int(user_id))


@app.route("/")
@app.route("/signup", methods=["GET", "POST"])
def signup():
    """
    The signup route allows the user to signup with email, password, and zipcode.
    """
    if flask.request.method == "GET":
        return flask.render_template("signup.html")
    if flask.request.method == "POST":
        email_data = flask.request.form["email"]
        if email_data.endswith(".com"):
            password_data = flask.request.form["password"]
            zip_data = flask.request.form["zip"]
            if zip_data.isnumeric() and len(zip_data) == 5:
                password_hash = generate_password_hash(password_data, method="sha256")
                # only querying to check if email already exists in the DB
                contains_data = Users.query.filter_by(email=email_data).first()
                if contains_data is None:
                    db.session.begin()
                    insert_data = Users(email_data, password_hash, zip_data)
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
    """
    The login route allows the user to login with email and password.
    """
    if flask.request.method == "GET":
        return flask.render_template("login.html")
    if flask.request.method == "POST":
        email_data = flask.request.form["email"]
        email_query = Users.query.filter_by(email=email_data).first()
        password_data = flask.request.form["password"]
        if email_query is None or not check_password_hash(
            email_query.password, password_data
        ):
            flask.flash("Email or password is incorrect. Please try again.")
        else:
            login_user(email_query)
            return flask.redirect(flask.url_for("main"))
    return flask.render_template("login.html")


@app.route("/main", methods=["GET", "POST"])
@login_required
def main():
    """
    This route will display the events based on the current user's zipcode.
    """
    events = ticketmaster_api.getEvents(current_user.zip)
    return flask.render_template("index.html", events=events)


@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    """
    The profile route will display the events for
    the current user assuming they have added event(s).
    """
    if flask.request.method == "GET":
        my_list = []
        events = UserEvents.query.filter_by(email=current_user.email).all()
        for event in events:
            my_list.append(ticketmaster_api.getEvents(event.eventId))
        return flask.render_template(
            "profile.html", user=current_user.email, events=my_list
        )
    return ""


@app.route("/reroute", methods=["POST"])
@login_required
def reroute():
    """
    The reroute route was used to keep track of the search term.
    """
    if flask.request.method == "POST":
        result = flask.request.form["user_input"]
        return flask.redirect(flask.url_for("search", user_input=result), code=307)
    return ""


@app.route("/search/<user_input>", methods=["GET", "POST"])
@login_required
def search(user_input):
    """
    The search route was used to display the events of the search term.
    """
    if flask.request.method == "GET":
        return flask.render_template("search.html")
    if flask.request.method == "POST":
        events = ticketmaster_api.search(user_input)
        if events is False:
            flask.flash("Search came up empty. Please try again.")
            return flask.render_template("search.html", user_input=user_input)
        return flask.render_template(
            "search.html", user_input=user_input, events=events, allow="True"
        )
    return ""


@app.route("/add", methods=["POST"])
@login_required
def add():
    """
    The add route was used to allow the user to add events to their events list.
    """
    if flask.request.method == "POST":
        event_id = flask.request.form["eventId"]
        current_page = flask.request.form["currentPage"]
        contains_data = UserEvents.query.filter_by(
            email=current_user.email, eventId=event_id
        ).first()
        if contains_data is None:
            db.session.begin()
            insert_data = UserEvents(current_user.email, event_id)
            db.session.add(insert_data)
            db.session.commit()
            if current_page == "index":
                return flask.redirect(flask.url_for("main"))
            url = flask.request.referrer
            split = url.split("/")
            last_search = split[-1]
            return flask.redirect(
                flask.url_for("search", user_input=last_search), code=307
            )
        flask.flash(
            "Event has already been added to your list. Please choose another event."
        )
        return flask.redirect(flask.url_for("main"), code=307)
    return ""


@app.route("/delete", methods=["POST"])
@login_required
def delete():
    """
    The delete route was used to allow users to delete events from their events list.
    """
    if flask.request.method == "POST":
        event_id = flask.request.form["eventId"]
        contains_data = UserEvents.query.filter_by(
            email=current_user.email, eventId=event_id
        ).first()
        if contains_data is not None:
            db.session.begin()
            UserEvents.query.filter_by(
                email=current_user.email, eventId=event_id
            ).delete()
            db.session.commit()
            return flask.redirect(flask.url_for("profile"))
        return flask.redirect(flask.url_for("profile"))
    return ""


@app.route("/event_details", methods=["GET", "POST"])
@login_required
def event_details():
    """
    The event details page is used to display specific information of an event.
    """
    if flask.request.method == "GET":
        return flask.render_template("event_details.html")
    if flask.request.method == "POST":
        event_id = flask.request.form["eventId"]
        event_detail = ticketmaster_api.getEventDetails(event_id)
        return flask.render_template(
            "event_details.html",
            name=event_detail["name"],
            eventImageURL=event_detail["eventImageURL"],
            startDate=event_detail["startDate"],
            genre=event_detail["genre"],
            minPrice=event_detail["minPrice"],
            maxPrice=event_detail["maxPrice"],
            venue=event_detail["venue"],
            address=event_detail["address"],
            longitude=event_detail["longitude"],
            latitude=event_detail["latitude"],
            GOOGLEMAP_API_KEY=os.getenv("GOOGLEMAP_API_KEY"),
        )
    return ""


@app.route("/logout")
@login_required
def logout():
    """
    The logout route is used to end the user's session and clear their cookies.
    """
    logout_user()
    return flask.redirect(flask.url_for("signup"))


@app.errorhandler(500)
def internal_error():
    """
    The internal error route is used to handle the 500 error.
    """
    return flask.redirect(flask.request.referrer)


if __name__ == "__main__":
    db.create_all()
    from models import Users, UserEvents

    app.run(
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
    )
