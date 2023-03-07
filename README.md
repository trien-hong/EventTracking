# Update
There are currently 3 different versions of this web app. One using Django REST framework with ReactJS (single-page application), one using Django (with templates), and one using Flask (with templates). All versions use PostgreSQL as the database.

For the most updated version it will be Django REST framework with ReactJS (single-page application). Django (with templates) and Flask (with templates) version is quite outdated. I will no longer update the Django/Flask version anymore.

The Django REST framework with ReactJS version contains some new features along with much needed updated code (compared to Django/Flask). Both Django versions can be run locally using docker-compose. You will need to obtain API keys and set up a/multiple .env file(s).

Each version has its own README.md file with more information.

# Event Tracking Web App
Users can sign up using their email, username, password (which are hashed and not plaintext), and a zip code. These four information will then be saved into a PostgreSQL database. Upon a successful signup, a simple welcome email will be sent out to the email address provided. Upon a failed/successful user's account info change, a simple email notification will be sent out. I am currently using gmail's simple mail transfer protocol (SMTP). You can change it up if you would like.

When the user tries to log in, it'll query the database for matching credentials. If matching, the user is now logged in. In the Django REST framework with ReactJS version, I've implemented JWT (JSON Web Tokens). After logging in the JWT is saved into their browser's localStorage. After the access token is expired, a refresh token will regenerate a new access token. JWT is useful for authentication on the back-end along with containing useful information in its payload for the front-end.

On the homepage, we make an API call to Ticketmaster using the current logged-in user's zip code. Ticketmaster will then send back a JSON containing events based on that zip code.

If no events exist, the user may also search for events using keywords such as "baseball", "concerts", "comedy", etc. Users can also search with zip codes such as "90028" or "10001".

Each event that is displayed is also clickable to see even more details of that specific event. Weather for the location and a general map with parking and ATMs icons are also displayed. Third party APIs includes OpenWeatherMap API and Google's Maps JavaScript API. Within event details page, user can also add a review (rating & comment). Since reviews are public, users will be able to see other user's review as well.

There is also a profile component in which the user can add the specific event into a personal list. They may also delete the event from their list.

# Images (from Django w/ ReactJS)
<details>
    <summary>Click to view images</summary>
    <a href="https://imgur.com/a/znEcjhc" target="_blank">Imgur link with a short description for each image</a>
    <br><br>
    <img src="https://i.imgur.com/LEaCvSl.png">
    <img src="https://i.imgur.com/0YjOYWV.png">
    <img src="https://i.imgur.com/5e1txIa.png">
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