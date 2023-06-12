# Update
There are currently 3 different versions of this web app. One using Django REST framework with ReactJS (single-page application), one using Django (with templates), and one using Flask (with templates). All versions use PostgreSQL for the database.

For the most updated version it will be Django REST framework with ReactJS (single-page application). Django (with templates) and Flask (with templates) version is quite outdated. I will no longer update the Django/Flask version anymore.

The Django REST framework with ReactJS version contains some new features along with much needed updated code (compared to Django/Flask). Both Django versions can be run locally using docker-compose. You will need to obtain API keys and set up a/multiple .env file(s).

Each version has its own README.md file with more information.

# Django w/ ReactJS & PostgreSQL
This version is using Django (specifically as an API using Django's REST framework) with ReactJS and PostgreSQL as the database. Nginx is serving both React and Django. All API request is going through Nginx and Gunicorn.<br>
This is a single page applcation (SPA). A page refresh never occurs. Everything is rerender on a single page depending on the user's action.

# Other Versions
Django with Templates | [https://github.com/trien-hong/event-tracking-django](https://github.com/trien-hong/event-tracking-django)<br>
Flask with Templates | [https://github.com/miserrano7/EventTracking](https://github.com/miserrano7/EventTracking)<br>

# Event Tracking Web App
This is based on a client-server architecture. The client is sending request (GET, POST, PUT, DELETE, etc.) to the server. The server is then returning back JSON data and/or status codes. The front-end will process the data from the back-end in some meaningful way for the end-user.

Users can sign up using their email, username, password (which are hashed and not plaintext), and a zip code. These four information will then be saved into a PostgreSQL database.

When the user tries to log in, it'll query the database for matching credentials. If matching, the user is now logged in. In the Django REST framework with ReactJS version, I've implemented JWT (JSON Web Tokens). After logging in the JWT is saved into their browser's localStorage. The JWT consist of an access token and a refresh token. When the access token expires, a refresh token is used to generate a new access token. JWT is useful for authentication along with containing useful information in its payload for the front-end.

On the homepage, we make an API call to Ticketmaster using the current logged-in user's zip code. Ticketmaster will then send back a JSON containing events based on that zip code. Each event displayed may be saved so that you have refer back to it at a later date within your profile.

If no events exist, the user may also search for events using keywords such as "baseball", "concerts", "comedy", etc. Users can also search with zip codes such as "90028" or "10001".

Each event that is displayed is also clickable to see even more details of that specific event. Weather for the location along with a general purpose map with icons for nearby parking and ATMs are displayed. Third party APIs includes OpenWeatherMap API and Google's Maps JavaScript API. Within event details page, user can also add a review (rating & comment) for that specific event. Since reviews are public, users will be able to see other user's review as well. Users may also reply to different users review.

There is also a profile component built in containing several different things. The first is a way to change your account information (username, password, & zip code). For customization purposes, a user may also add/delete a profile picture to/from their account. The second is a way to view all the events that you have saved. The third is a way to view all the reviews that you have left.

I have implemented emailing. There are 3 conditions for an email to be sent out.
* Upon a successful signup, a simple welcome email will be sent out to the user's email address.
* Upon a failed/successful user's account info change/update (email, username, password, and/or zip code), a simple email notification will be sent out.
* Upon a successful delection of a user's account, a simple email notification will be sent out.

I am currently using gmail's simple mail transfer protocol (SMTP). You can change it up if you would like. There should be nothing stopping you as far as I can tell.

I have also added Cypress for simple end-to-end/E2E testing. I will add more test cases as time goes on. I've added a README.md to the cypress folder. Please refer to that to see how you can get cypress running.

# Setting Up
Ensure you are in the EventTracking folder. There are three .env files you will need to add.

One in the EventTracking folder (where docker-compose.yml is located), one in django_backend folder (where Dockerfile is located), and one in react_frontend folder (where another Dockerfile is located). A combined total of 17 environment variables are needed.

## EventTracking folder .env file
There are 3 total variables you'll need to add in this .env file. We can just use the default settings for now.
* `POSTGRES_DB="postgres"`
* `POSTGRES_USER="postgres"`
* `POSTGRES_PASSWORD="postgres"`

## django_backend folder .env file
There are 13 total variables you'll need to add in this .env file. We can just use the default database of PostgreSQL for now.
* `EMAIL_HOST_USER="ENTER YOUR GOOGLE/GMAIL EMAIL"`
* `EMAIL_HOST_PASSWORD="ENTER YOUR APP PASSWORD NOT YOUR GOOGLE/GMAIL PASSWORD"`
* `TICKETMASTER_API_KEY="ENTER YOUR TICKETMASTER API KEY HERE"`
* `OPENWEATHERMAP_API_KEY="ENTER YOUR OPENWEATHERMAP API KEY HERE"`
* `SECRET_KEY="ENTER YOUR SECRET KEY HERE (you can make this up)"`
* `DB_NAME="postgres"`
* `DB_USER="postgres"`
* `DB_PASSWORD="postgres"`
* `DB_HOST="database"`
* `DB_PORT="5432"`
* `SUPERUSER_TEST_EMAIL="ENTER A EMAIL (you can make this up)"`
* `SUPERUSER_TEST_USERNAME="ENTER A USERNAME (you can make this up)"`
* `SUPERUSER_TEST_PASSWORD="ENTER A PASSWORD (you can make this up)"`

Note that the `EMAIL_HOST_PASSWORD` is NOT the password you use to login to your Google/Gmail account with. You'll need to generate an app password within "manage your google account" security settings. You will also have to activate two factor authentication on your google account otherwise it will not work.<br>I am currently using gmail's simple mail transfer protocol (SMTP). You can change it up if you would like.

## react_backend folder .env file
There is only 1 variable you'll need to add in this .env file.
* `REACT_APP_GOOGLEMAP_API_KEY="ENTER YOUR GOOGLE MAP API KEY HERE"`

## Docker & Docker-compose
Docker should handle all the CLI (releated to setup) so you don't have to. You just need to set up the three .env files.<br><br>
Ensure you have docker and docker compose. You can find more info here.<br>
[docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)<br>
[docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)<br>
[docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

# Running
Now that your three .env files are set up. Ensure you're in the EventTracking folder (where docker-compose.yml is located) before starting. You can run the app with docker-compose. In your terminal type in `docker-compose build` and then `docker-compose up`. Both these commands may take some time.

Within your browser, go to `localhost` and you should see a login page. If the first option does not work try `127.0.0.1`. It may take some time for things to load.

# 3rd Party APIs
* Ticketmaster API: [developer.ticketmaster.com](https://developer.ticketmaster.com)<br>
* OpenWeatherMap API: [openweathermap.org/api](https://openweathermap.org/api)<br>
* Google Maps API: [developers.google.com/maps](https://developers.google.com/maps)

# 3rd Party Tools
* ReactJS | [https://reactjs.org/](https://reactjs.org/)<br>
* React Router DOM | [https://www.npmjs.com/package/react-router-dom/](https://www.npmjs.com/package/react-router-dom/)<br>
* Material UI (MUI) | [https://mui.com/](https://mui.com/)<br>
* Django | [https://www.djangoproject.com/](https://www.djangoproject.com/)<br>
* Django REST Framework | [https://www.django-rest-framework.org/](https://www.django-rest-framework.org/)<br>
* Simple JWT | [https://django-rest-framework-simplejwt.readthedocs.io/en/latest/](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)<br>
* JWT Decode | [https://www.npmjs.com/package/jwt-decode](https://www.npmjs.com/package/jwt-decode/)<br>
* Dotenv | [https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)<br>
* Python dotenv | [https://pypi.org/project/python-dotenv/](https://pypi.org/project/python-dotenv/)<br>
* Python Imaging Library (PIL/Pillow) | [https://pillow.readthedocs.io/en/stable/](https://pillow.readthedocs.io/en/stable/)<br>
* Cypress | [https://www.cypress.io/](https://www.cypress.io/)

# NOTE
I commented out two specific lines in EventDetails.js to prevent the map from loading. This is because while you do get $200 worth of free credits every month (before Google starts charging), it can add up. That's 4878 dynamic maps (at 0.007 cents per load) plus 9756 places search (at 0.017 per search) for a total of $199.998 for free.<br>
If you would like to see the maps, simply uncomment the two lines in EventDetails.js and the map should start loading.<br>

For updating user's information I am well aware of the flaw that the previous refresh token is still active (until it expires). The acess token should expire shortly. However, that refresh token may still be used to generate a new access token. Thereby gaining access to what should otherwise be restricted endpoints.<br>
Possible solution is to add the refresh token to a blacklist if user's information has been updated. If a malicious actor tries to gain acess with that blacklisted token, it should prevent them from gaining access.

# Images (from Django w/ ReactJS)
<details>
    <summary>Click to view images</summary>
    <a href="https://imgur.com/a/znEcjhc" target="_blank">Imgur link with a short description for each image</a>
    <br><br>
    <img src="https://i.imgur.com/9FHXMl4.png">
    <img src="https://i.imgur.com/0YjOYWV.png">
    <img src="https://i.imgur.com/5e1txIa.png">
    <img src="https://i.imgur.com/x7oXz2u.png">
    <img src="https://i.imgur.com/FmMaEqj.png">
    <img src="https://i.imgur.com/mrRFW9b.png">
    <img src="https://i.imgur.com/NphgiNl.png">
    <img src="https://i.imgur.com/bKujqDG.png">
    <img src="https://i.imgur.com/4lSbSuD.png">
    <img src="https://i.imgur.com/KbjyTto.png">
    <img src="https://i.imgur.com/0jML4GA.png">
    <img src="https://i.imgur.com/x01eFsk.png">
    <img src="https://i.imgur.com/Qj3h2LN.png">
    <img src="https://i.imgur.com/lX3nNm2.png">
    <img src="https://i.imgur.com/avFzVw4.png">
    <img src="https://i.imgur.com/amShT4K.png">
    <img src="https://i.imgur.com/iRsFgoL.png">
    <img src="https://i.imgur.com/7BCpz3v.png">
    <img src="https://i.imgur.com/nAvcZ9g.png">
    <img src="https://i.imgur.com/dSSbJOl.png">
    <img src="https://i.imgur.com/smlmwsX.png">
    <img src="https://i.imgur.com/FV6yAgw.png">
    <img src="https://i.imgur.com/GgJttWn.png">
    <img src="https://i.imgur.com/VIAwREW.png">
    <img src="https://i.imgur.com/LAbDGAE.png">
    <img src="https://i.imgur.com/PmzxvIA.png">
    <img src="https://i.imgur.com/giAa17j.png">
    <img src="https://i.imgur.com/bKWjorK.png">
    <img src="https://i.imgur.com/qCNVx7I.png">
    <img src="https://i.imgur.com/qPw5W3t.png">
    <img src="https://i.imgur.com/zPEurIX.png">
    <img src="https://i.imgur.com/F7R2Cqg.png">
    <img src="https://i.imgur.com/o9CinAk.png">
    <img src="https://i.imgur.com/XciTPoy.png">
    <img src="https://i.imgur.com/MU5xVXe.png">
    <img src="https://i.imgur.com/tuPiXau.png">
    <img src="https://i.imgur.com/cl5nuoI.png">
    <img src="https://i.imgur.com/2MIEOZW.png">
    <img src="https://i.imgur.com/CUVWc2q.png">
    <img src="https://i.imgur.com/qr7yduH.png">
    <img src="https://i.imgur.com/Omjuo4j.png">
    <img src="https://i.imgur.com/lwpZRkw.png">
</details>
