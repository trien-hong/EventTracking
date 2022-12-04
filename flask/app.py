# pylint: disable=E1101, W1508, C0103

"""
SWE Final Project | Event Tracking
"""

import os
import time
import flask
from waitress import serve
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
import openweathermap_api

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
@app.route("/welcome", methods=["GET"])
def welcome():
    """
    The welcome route is used as the landing page of the web app
    """
    return flask.render_template("welcome.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    """
    The signup route allows the user to signup with email, password, and zip code.
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
                # generate a hash using sha256
                contains_data = Users.query.filter_by(email=email_data).first()
                # only querying to check if email already exists in the DB
                if contains_data is None:
                    # if the email was not found in the database it'll be added here
                    db.session.begin()
                    insert_data = Users(email_data, password_hash, zip_data)
                    db.session.add(insert_data)
                    db.session.commit()
                    time.sleep(1)
                    return flask.redirect(flask.url_for("login"))
            else:
                flask.flash("Zip code should be 5 numbers. Please try again.")
                time.sleep(1)
                return flask.render_template("signup.html")
        else:
            flask.flash("Email needs to end in '.com'. Please try again.")
            time.sleep(1)
            return flask.render_template("signup.html")
        flask.flash("Email already exists or is incorrect. Please login instead.")
    time.sleep(1)
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
        # the email & hash + salt will be checked here
        if email_query is None or not check_password_hash(
            email_query.password, password_data
        ):
            flask.flash("Email or password is incorrect. Please try again.")
        else:
            # if the email & hash + salt is found it'll log the user in
            login_user(email_query)
            time.sleep(1)
            return flask.redirect(flask.url_for("main"), code=307)
    time.sleep(1)
    return flask.render_template("login.html")


@app.route("/main", methods=["GET", "POST"])
@login_required
def main():
    """
    This route will display the events based on the current user's zip code.
    """
    if flask.request.method == "GET":
        (
            idList,
            nameList,
            imageList,
            dateList,
            cityList,
            minPriceList,
            maxPriceList,
        ) = ticketmaster_api.getEvents(current_user.zip)
        if idList is False:
            flask.flash(
                "Your zip code doesn't contain any events. Try searching for an event instead."
            )
            time.sleep(1)
            return flask.render_template("index.html", allow="False")
        time.sleep(1)
        return flask.render_template(
            "index.html",
            events=zip(
                idList,
                nameList,
                imageList,
                dateList,
                cityList,
                minPriceList,
                maxPriceList,
            ),
            allow="True",
        )
    if flask.request.method == "POST":
        (
            idList,
            nameList,
            imageList,
            dateList,
            cityList,
            minPriceList,
            maxPriceList,
        ) = ticketmaster_api.getEvents(current_user.zip)
        if idList is False:
            flask.flash(
                "Your zip code doesn't contain any events. Try searching for an event instead."
            )
            time.sleep(1)
            return flask.render_template("index.html", allow="False")
        (
            idList,
            nameList,
            imageList,
            dateList,
            cityList,
            minPriceList,
            maxPriceList,
        ) = ticketmaster_api.getEvents(current_user.zip)
        time.sleep(1)
        return flask.render_template(
            "index.html",
            events=zip(
                idList,
                nameList,
                imageList,
                dateList,
                cityList,
                minPriceList,
                maxPriceList,
            ),
            allow="True",
        )
    return ""


@app.route("/profile", methods=["GET"])
@login_required
def profile():
    """
    The profile route will display the events for
    the current user assuming they have added event(s).
    """
    if flask.request.method == "GET":
        user = current_user.email.split("@")
        time.sleep(1)
        return flask.render_template(
            "profile.html",
            user=user[0],
            events=UserEvents.query.filter_by(email=current_user.email).all(),
        )
    return ""

@app.route("/profile_settings", methods=["GET", "POST"])
@login_required
def profile_settings():
    if flask.request.method == "GET":
        time.sleep(1)
        return flask.render_template(
            "profile_settings.html", current_user=current_user.email.split("@")[0]
        )
    if flask.request.method == "POST":
        change_email = flask.request.form["email"]
        change_password = flask.request.form["password"]
        change_zip = flask.request.form["zip"]
        
        db.session.begin()

        contains_data = Users.query.filter_by(email=change_email).first()
        if(contains_data is not None):
            flask.flash("Email is already in use. Please try another email.")
        elif (change_email != ""):
            UserEvents.query.filter_by(email=current_user.email).update({UserEvents.email: change_email})
            Users.query.filter_by(email=current_user.email).update({Users.email: change_email})
        
        if(change_password != ""):
            password_hash = generate_password_hash(change_password, method="sha256")
            Users.query.filter_by(email=current_user.email).update({Users.password: password_hash})

        if(change_zip != "" and change_zip.isnumeric() is True):
            Users.query.filter_by(email=current_user.email).update({Users.zip: change_zip})
        elif (change_zip != "" and change_zip.isnumeric() is False):
            flask.flash("Zip code should be 5 numeric characters.")
        
        db.session.commit()
        
        flask.flash("If you see an error, that specfic entry was not updated. Otherwise it was a success.")
        
        time.sleep(1)
        return flask.render_template(
            "profile_settings.html", current_user=current_user.email.split("@")[0]
        )

@app.route("/rerouteForSearch", methods=["POST"])
@login_required
def rerouteForSearch():
    """
    The reroute route is used to keep track of the search term.
    """
    if flask.request.method == "POST":
        result = flask.request.form["user_input"]
        # the reason for this was to generate dynamic URLs
        time.sleep(1)
        return flask.redirect(flask.url_for("search", user_input=result), code=307)
    return ""

@app.route("/search/id/<user_input>", methods=["GET", "POST"])
@login_required
def search(user_input):
    """
    The search route is used to display the events of the search term.
    """
    if flask.request.method == "GET":
        return flask.render_template("search.html")
    if flask.request.method == "POST":
        events = ticketmaster_api.search(user_input)
        if events is False:
            flask.flash("Search came up empty. Please try again.")
            # user_input will act as the new URL of the user's input
            # ex: /search/<user_input> -> /search/baseball
            time.sleep(1)
            return flask.render_template("search.html", user_input=user_input)
        time.sleep(1)
        return flask.render_template(
            "search.html", user_input=user_input, events=events, allow="True"
        )
    return ""


@app.route("/add", methods=["POST"])
@login_required
def add():
    """
    The add route is used to allow the user to add events to their events list.
    """
    if flask.request.method == "POST":
        current_page = flask.request.form["currentPage"]
        event_id = flask.request.form["eventId"]
        event_name = flask.request.form["eventName"]
        event_date = flask.request.form["eventDate"]
        event_image_url = flask.request.form["eventImageURL"]
        event_address = flask.request.form["eventAddress"]
        event_price = flask.request.form["eventPrice"]
        contains_data = UserEvents.query.filter_by(
            email=current_user.email,
            eventId=event_id,
            eventName=event_name,
            eventDate=event_date,
            eventAddress=event_address,
            eventImageURL=event_image_url,
            eventPrice=event_price,
        ).first()
        # if the added event is not in the database it'll be added
        if contains_data is None:
            db.session.begin()
            insert_data = UserEvents(
                current_user.email,
                event_id,
                event_name,
                event_date,
                event_address,
                event_image_url,
                event_price,
            )
            db.session.add(insert_data)
            db.session.commit()
            if current_page == "index":
                flask.flash("The event has been added to your list.")
                time.sleep(1)
                return flask.redirect(flask.url_for("main"), code=307)
            url = flask.request.referrer
            split = url.split("/")
            last_search = split[-1]
            flask.flash("The event has been added to your list.")
            time.sleep(1)
            return flask.redirect(
                flask.url_for("search", user_input=last_search), code=307
            )
        if current_page == "index":
            flask.flash(
                "Event has already been added to your list. Please choose another event."
            )
            time.sleep(1)
            return flask.redirect(flask.url_for("main"))
        if current_page == "search":
            url = flask.request.referrer
            split = url.split("/")
            last_search = split[-1]
            flask.flash(
                "Event has already been added to your list. Please choose another event."
            )
            time.sleep(1)
            return flask.redirect(
                flask.url_for("search", user_input=last_search), code=307
            )
    return ""


@app.route("/delete", methods=["POST"])
@login_required
def delete():
    """
    The delete route is used to allow users to delete events from their events list.
    """
    if flask.request.method == "POST":
        event_id = flask.request.form["eventId"]
        event_name = flask.request.form["eventName"]
        event_image_url = flask.request.form["eventImageURL"]
        contains_data = UserEvents.query.filter_by(
            email=current_user.email,
            eventId=event_id,
            eventName=event_name,
            eventImageURL=event_image_url,
        ).first()
        # if deleted event is found in the database it'll be deleated
        if contains_data is not None:
            db.session.begin()
            UserEvents.query.filter_by(
                email=current_user.email,
                eventId=event_id,
                eventName=event_name,
                eventImageURL=event_image_url,
            ).delete()
            db.session.commit()
            flask.flash("Event has been deleted from your list.")
            time.sleep(1)
            return flask.redirect(flask.url_for("profile"))
        time.sleep(1)
        return flask.redirect(flask.url_for("profile"))
    return ""

@app.route("/rerouteForEventDetails", methods=["POST"])
@login_required
def rerouteForEventDetails():
    """
    The reroute route is used to keep track of the event that was clicked.
    """
    if flask.request.method == "POST":
        result = flask.request.form["eventId"]
        # the reason for this was to generate dynamic URLs
        time.sleep(1)
        return flask.redirect(flask.url_for("event_details", event_id=result), code=307)
    return ""

@app.route("/event_details/id/<event_id>", methods=["GET", "POST"])
@login_required
def event_details(event_id):
    """
    The event details page is used to display specific information of an event.
    """
    if flask.request.method == "GET":
        return flask.render_template("event_details.html")
    if flask.request.method == "POST":
        event_id = flask.request.form["eventId"]
        # will call the function getEventDetails with event_id as the parameter
        # and return a dictionary of said event with the most notable information
        (
            name,
            eventImageURL,
            startDate,
            genre,
            minPrice,
            maxPrice,
            venue,
            address,
            longitude,
            latitude,
        ) = ticketmaster_api.getEventDetails(event_id)
        weather_detail = openweathermap_api.getWeather(latitude, longitude)
        time.sleep(1)
        return flask.render_template(
            "event_details.html",
            name=name,
            eventImageURL=eventImageURL,
            startDate=startDate,
            genre=genre,
            minPrice=minPrice,
            maxPrice=maxPrice,
            venue=venue,
            address=address,
            longitude=longitude,
            latitude=latitude,
            temperature_f=weather_detail["temperature_f"],
            temperature_c=weather_detail["temperature_c"],
            temperature_min_f=weather_detail["temperature_min_f"],
            temperature_min_c=weather_detail["temperature_min_c"],
            temperature_max_f=weather_detail["temperature_max_f"],
            temperature_max_c=weather_detail["temperature_max_c"],
            weather_icon=weather_detail["weather_icon"],
            weather_description=weather_detail["weather_description"],
            humidity=weather_detail["humidity"],
            wind=weather_detail["wind"],
            GOOGLEMAP_API_KEY=os.getenv("GOOGLEMAP_API_KEY"),
        )
    return ""


@app.route("/logout")
@login_required
def logout():
    """
    The logout route is used to end the user's session and clear their cookies.
    """
    flask.flash("You have successfully logged out.")
    logout_user()
    time.sleep(1)
    return flask.redirect(flask.url_for("login"))

if __name__ == "__main__":
    db.create_all()
    from models import Users, UserEvents

    # app.run(
    #     host=os.getenv("IP", "0.0.0.0"),
    #     port=int(os.getenv("PORT", 8080)),
    # )

    serve(app, host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)))
