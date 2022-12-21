# Django w/ React & PostgreSQL
This version is using Django (specfially as an API using Django's REST framework) with React and PostgreSQL as the database. Nginx is serving both React and Django. All API request is going through Nginx and Gunicorn.

# Setting Up
Ensure you are in the django_react_app folder/version. There are two .env files you will need to add.

One in the django_react_app folder (where docker-compose.yml is located) and one in django_backend folder (where Dockerfile is located). A total of 9 variables.

## django_backend folder .env
There are 6 total variables you'll need to add in this .env file. We can just use the default database of PostgreSQL for now.
* `TICKETMASTER_API_KEY="ENTER YOUR TICKETMASTER API KEY HERE"`
* `DB_NAME="postgres"`
* `DB_USER="postgres"`
* `DB_PASSWORD="postgres"`
* `DB_HOST="database"`
* `DB_PORT="5432"`

## django_react_app folder .env
There are 3 total variables you'll need to add in this .env file. We can just use the default settings for now.
* `POSTGRES_DB="postgres"`
* `POSTGRES_USER="postgres"`
* `POSTGRES_PASSWORD="postgres"`

Docker should handle all the CLI (releated to setup) so you don't have to. You just need to set up the two .env files.

## Docker & Docker-compose
Ensure you have docker and docker compose. You can find more info here. <br>
[docs.docker.com/get-docker/](https://docs.docker.com/get-docker/) <br>
[docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) <br>
[docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

# Running
Now that your .env file is set up. Ensure you're in the django_react_app version/folder before starting. You can run the app with docker-compose. In your terminal type in `docker-compose build` and then `docker-compose up`. Both these commands may take some time.

Within your browser, go to `localhost`. if the first option does not work try `127.0.0.1`. It may take some time for things to load.

# 3rd Party APIs
Ticketmaster API: [developer.ticketmaster.com](https://developer.ticketmaster.com)