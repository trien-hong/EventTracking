# Django w/ ReactJS & PostgreSQL
This version is using Django (specfially as an API using Django's REST framework) with ReactJS and PostgreSQL as the database. Nginx is serving both React and Django. All API request is going through Nginx and Gunicorn. <br>
This is a single page applcation (SPA). A page refresh never occurs. Everything is rerender on a single page depending on the user's action.

# Setting Up
Ensure you are in the django_react_app folder/version. There are three .env files you will need to add.

One in the django_react_app folder (where docker-compose.yml is located), one in django_backend folder (where Dockerfile is located), and one in react_frontend (where Dockerfile is located). A total of 12 environment variables are needed.

## django_react_app folder .env
There are 3 total variables you'll need to add in this .env file. We can just use the default settings for now.
* `POSTGRES_DB="postgres"`
* `POSTGRES_USER="postgres"`
* `POSTGRES_PASSWORD="postgres"`

## django_backend folder .env
There are 8 total variables you'll need to add in this .env file. We can just use the default database of PostgreSQL for now.
* `TICKETMASTER_API_KEY="ENTER YOUR TICKETMASTER API KEY HERE"`
* `OPENWEATHERMAP_API_KEY="ENTER YOUR OPENWEATHERMAP API KEY HERE"`
* `SECRET_KEY="ENTER YOUR SECRET KEY HERE (you can make this up)"`
* `DB_NAME="postgres"`
* `DB_USER="postgres"`
* `DB_PASSWORD="postgres"`
* `DB_HOST="database"`
* `DB_PORT="5432"`

## react_backend folder .env
There is only 1 variable you'll need to add in this .env file.
* `REACT_APP_GOOGLEMAP_API_KEY="ENTER YOUR GOOGLE MAP API KEY HERE"`

## Docker & Docker-compose
Docker should handle all the CLI (releated to setup) so you don't have to. You just need to set up the three .env files. <br><br>
Ensure you have docker and docker compose. You can find more info here. <br>
[docs.docker.com/get-docker/](https://docs.docker.com/get-docker/) <br>
[docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) <br>
[docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

# Running
Now that your three .env files are set up. Ensure you're in the django_react_app version/folder before starting. You can run the app with docker-compose. In your terminal type in `docker-compose build` and then `docker-compose up`. Both these commands may take some time.

Within your browser, go to `localhost` and you should see a login page. If the first option does not work try `127.0.0.1`. It may take some time for things to load.

# 3rd Party APIs
Ticketmaster API: [developer.ticketmaster.com](https://developer.ticketmaster.com) <br>
OpenWeatherMap API: [openweathermap.org/api](https://openweathermap.org/api) <br>
Google Maps API: [developers.google.com/maps](https://developers.google.com/maps)

# NOTE:
I commented out two specific lines in EventDetails.js to prevent the map from loading. This is because while you do get $200 worth of free credits every month (before they start charing), it can add up. That's 4878 dynamic maps (at 0.007 cents per load) plus 9756 places search (at 0.017 per search) for a total of $199.998 for free. <br>
If you would like to see the maps, simply uncomment the two lines in EventDetails.js and the map should start loading. <br>

For updating user's information I am well aware of the flaw that the previous refresh token is still active (until it expires). The acess token should expire shortly. However, that refresh token may still be used to generate a new access token. Thereby gaining access to what should otherwise be restricted materials.<br>
Possible solution is to add the refresh token to a blacklist if user's information has been updated. If a malicious actor tries to gain acess with that blacklisted token, it should prevent them from gaining access.

# Images (from Django w/ ReactJS)
<details>
    <summary>Click to view images</summary>
    <a href="https://imgur.com/a/znEcjhc" target="_blank">Imgur link with a short description for each image</a>
    <br><br>
    <img src="https://i.imgur.com/3KsWCjP.png">
    <img src="https://i.imgur.com/1Odrrox.png">
    <img src="https://i.imgur.com/7EuSEN1.png">
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