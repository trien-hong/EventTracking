# Update
There are currently 3 different versions of this web app. One using Django REST framework with React (single-page application), one using Django (with templates), and Flask (with templates). All versions use PostgreSQL as the database. The most updated versions is Django with React. Flask version is quite outdated.

The Django and Django with React version contains some new features along with updated code (compared to Flask). Both Django versions can be run locally using docker-compose. You will need to obtain API keys and set up a/multiple .env file.

Each version has its own README.md file with more information.

# Event Tracking Web App
Users can sign up using their email/username, password (which are hashed and not plaintext), and a zip code. These three information will then be saved into a PostgreSQL database.

When the user tries to log in, it'll query the database for matching credentials. If matching, the user is now logged in. In the Django & React version, I've implemented JWT (JSON Web Tokens). After logging in The JWT is saved into their browser's localStorage. After the access token is expired, a refresh token will regenerate a new access token. JWT is useful for authentication along with containing useful information in its payload.

On the homepage, we make an API call to Ticketmaster using the current logged-in user's zip code. Ticketmaster will then send back a JSON containing events based on that zip code.

If no events exist, the user may also search for events using keywords such as "baseball", "concerts", "comedy", etc. Users can also search with zip codes such as "90028" or "10001".

Each event that is displayed is also clickable to see even more details of that specific event. Weather for the location and a general map with parking and ATMs icons are also displayed. Third party APIs includes OpenWeatherMap API and Google's Maps JavaScript API. Within event details page, user can also add a review (rating & comment). Since reviews are public, users will be able to see other user's review as well.

There is also a profile component in which the user can add the specific event into a personal list. They may also delete the event from their list.

# Images (from Django w/ ReactJS)
<details>
    <summary>Click to view images</summary>
    <img src="https://i.imgur.com/9tluYhW.png">
    <img src="https://i.imgur.com/CZRIkWi.png">
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
    <img src="https://i.imgur.com/knGYwwY.png">
    <img src="https://i.imgur.com/uow4ZVH.png">
    <img src="https://i.imgur.com/aZR9KgR.png">
    <img src="https://i.imgur.com/if4tPvA.png">
    <img src="https://i.imgur.com/eFaakJt.png">
    <img src="https://i.imgur.com/kYjao53.png">
</details>