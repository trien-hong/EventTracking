# Django w/ ReactJS & PostgreSQL
This version is using Django (specfially as an API using Django's REST framework) with ReactJS and PostgreSQL as the database. Nginx is serving both React and Django. All API request is going through Nginx and Gunicorn.

# Setting Up
Ensure you are in the django_react_app folder/version. There are three .env files you will need to add.

One in the django_react_app folder (where docker-compose.yml is located), one in django_backend folder (where Dockerfile is located), and one in react_frontend (where Dockerfile is located). A total of 11 variables are needed.

## django_react_app folder .env
There are 3 total variables you'll need to add in this .env file. We can just use the default settings for now.
* `POSTGRES_DB="postgres"`
* `POSTGRES_USER="postgres"`
* `POSTGRES_PASSWORD="postgres"`

## django_backend folder .env
There are 7 total variables you'll need to add in this .env file. We can just use the default database of PostgreSQL for now.
* `TICKETMASTER_API_KEY="ENTER YOUR TICKETMASTER API KEY HERE"`
* `OPENWEATHERMAP_API_KEY="ENTER YOUR OPENWEATHERMAP API KEY HERE"`
* `DB_NAME="postgres"`
* `DB_USER="postgres"`
* `DB_PASSWORD="postgres"`
* `DB_HOST="database"`
* `DB_PORT="5432"`

## react_backend folder .env
There is only 1 variable you'll need to add in this .env file.
* `REACT_APP_GOOGLEMAP_API_KEY="ENTER YOUR GOOGLE MAP API KEY HERE"`

Docker should handle all the CLI (releated to setup) so you don't have to. You just need to set up the three .env files.

## Docker & Docker-compose
Ensure you have docker and docker compose. You can find more info here. <br>
[docs.docker.com/get-docker/](https://docs.docker.com/get-docker/) <br>
[docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) <br>
[docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

# Running
Now that your .env file is set up. Ensure you're in the django_react_app version/folder before starting. You can run the app with docker-compose. In your terminal type in `docker-compose build` and then `docker-compose up`. Both these commands may take some time.

Within your browser, go to `localhost` and you should see a login page. If the first option does not work try `127.0.0.1`. It may take some time for things to load.

# 3rd Party APIs
Ticketmaster API: [developer.ticketmaster.com](https://developer.ticketmaster.com) <br>
OpenWeatherMap API: [openweathermap.org/api](https://openweathermap.org/api) <br>
Google Maps API: [developers.google.com/maps](https://developers.google.com/maps)

# Images
<details>
    <summary>Click to view images</summary>
    <br></br>
    ![images#1](https://i.imgur.com/9tluYhW.png)
    ![images#2](https://i.imgur.com/CZRIkWi.png)
    ![images#3](https://i.imgur.com/j5MpiQc.png)
    ![images#4]((https://i.imgur.com/geNwlrc.png)
    ![images#5]((https://i.imgur.com/I6LbfxV.png)
    ![images#6]((https://i.imgur.com/IvqNobW.png)
    ![images#7](https://i.imgur.com/bMoTlSZ.png)
    ![images#8](https://i.imgur.com/UQyS59B.png)
    ![images#9](https://i.imgur.com/ELF6b2Q.png)
    ![images#10](https://i.imgur.com/z6xgX4D.png)
    ![images#11](https://i.imgur.com/9Cg9kxJ.png)
    ![images#12]((https://i.imgur.com/DWpHx4W.png)
    ![images#13](https://i.imgur.com/anJuA4j.png)
    ![images#14](https://i.imgur.com/yEaJFSz.png)
    ![images#15](https://i.imgur.com/knGYwwY.png)
    ![images#16](https://i.imgur.com/uow4ZVH.png)
    ![images#17](https://i.imgur.com/aZR9KgR.png)
    ![images#18](https://i.imgur.com/if4tPvA.png)
    ![images#19](https://i.imgur.com/eFaakJt.png)
    ![images#20](https://i.imgur.com/kYjao53.png)
</details>