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

# Images
<details>
    <summary>Click to view images</summary>
    <img src="https://i.imgur.com/eYltm5A.png">
    <img src="https://i.imgur.com/NbjqElA.png">
    <img src="https://i.imgur.com/0n50aN6.png">
    <img src="https://i.imgur.com/j5MpiQc.png">
    <img src="https://i.imgur.com/geNwlrc.png">
    <img src="https://i.imgur.com/I6LbfxV.png">
    <img src="https://i.imgur.com/IvqNobW.png">
    <img src="https://i.imgur.com/bMoTlSZ.png">
    <img src="https://i.imgur.com/UQyS59B.png">
    <img src="https://i.imgur.com/ELF6b2Q.png">
    <img src="https://i.imgur.com/z6xgX4D.png">
    <img src="https://i.imgur.com/9Cg9kxJ.png">
    <img src="https://i.imgur.com/DWpHx4W.png">
    <img src="https://i.imgur.com/anJuA4j.png">
    <img src="https://i.imgur.com/yEaJFSz.png">
    <img src="https://i.imgur.com/BkjlziB.png">
    <img src="https://i.imgur.com/V1fV0AJ.png">
    <img src="https://i.imgur.com/PXr2yUS.png">
    <img src="https://i.imgur.com/0SgvLm6.png">
    <img src="https://i.imgur.com/4kwF9Uc.png">
    <img src="https://i.imgur.com/8QhOonM.png">
    <img src="https://i.imgur.com/tOCjsrN.png">
    <img src="https://i.imgur.com/aZR9KgR.png">
    <img src="https://i.imgur.com/if4tPvA.png">
    <img src="https://i.imgur.com/eFaakJt.png">
    <img src="https://i.imgur.com/kYjao53.png">
</details>