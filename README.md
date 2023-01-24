# Update
There are currently 3 different versions of this web app. One using Django REST framework with React (single-page application), one using Django (with templates), and Flask (with templates). All versions use PostgreSQL as the database. The most updated versions is Django with React. Flask version is quite outdated.

The Django and Django with React version contains some new features along with updated code (compared to Flask). Both Django versions can be run locally using docker-compose. You will need to set up a .env file.

Each version has its own README.md file.

# Event Tracking Web App
Users can sign up using their email/username, password (which are hashed and not plaintext), and a zip code. These three information will then be saved into a PostgreSQL database.

When the user tries to log in, it'll query the database for matching credentials. If matching, the user is now logged in. In the Django & React version, I've implemented JSON Web Tokens (JWT). The JWT saved into their browser's local storage. After the access token is expired, a refresh token will regenerate a new access token. However, when the refresh token is expired, the user's session will end (therefore forcefully logged out). JWT is also helpful in determining who is who on the front-end.

On the homepage, we make an API call to Ticketmaster using the current logged-in user's zip code. Ticketmaster will then send back a JSON containing events based on that zip code.

If no events exist, the user may also search for events using keywords such as "baseball", "concerts", "comedy", etc. You can also search with zip codes such as "90028" or "10001".

Each event that is displayed is also clickable to see even more details of that specific event. Weather for the location and a general map with parking and ATMs icons are also displayed. Third party APIs includes OpenWeatherMap API and Google's Maps JavaScript API. Within event details page, user can also add a review (rating & comment). Since reviews are public, users will be able to see other user's review as well.

There is also a profile component in which the user can add the specific event into a personal list. They may also delete the event from their list.

# Images (from Django w/ ReactJS)
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