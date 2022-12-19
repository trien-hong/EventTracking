# Django Using Templates & PostgreSQL
This version is using Django and it's templates with PostgreSQL as the database.

# Setting Up
To get the app running you need to setup your .env file first. Within your .env file you'll add in these variables. We can just use the default database of postgres for now. A total of 10 variables.
  * `TICKETMASTER_API_KEY="ENTER YOUR TICKETMASTER API KEY HERE"`
  * `OPENWEATHERMAP_API_KEY="ENTER YOUR OPEN WEATHER MAP API KEY HERE"`
  * `DB_NAME="postgres"`
  * `DB_USER="postgres"`
  * `DB_PASSWORD="postgres"`
  * `DB_HOST="database"`
  * `DB_PORT="5432"`
  * `POSTGRES_DB="postgres"`
  * `POSTGRES_USER="postgres"`
  * `POSTGRES_PASSWORD="postgres"`

Docker should handle all the CLI (releated to setup) so you don't have to. You just need to set up the two .env files.

# Docker & Docker-compose
Ensure you have docker and docker compose. You can find more info here. <br>
[docs.docker.com/get-docker/](https://docs.docker.com/get-docker/) <br>
[docs.docker.com/compose/install/](https://docs.docker.com/compose/install/) <br>
[docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

# Running
Now that your .env file is set up. Ensure you're in the django version/folder before starting. You can run the app with docker-compose. In your terminal type in `docker-compose build` and then `docker-compose up`. Both these commands may take some time.

Within your browser go to `localhost:8000 or 127.0.0.1:8000` if the first option does not work.

# 3rd Party APIs
[Ticketmaster API: developer.ticketmaster.com](https://developer.ticketmaster.com)

[Open Weather Map API: openweathermap.org](https://openweathermap.org/api)