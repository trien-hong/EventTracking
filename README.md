# Update
There are currently 3 different versions. One using Flask (outdated), one using Django with templates, and one using Django as back-end with React as front-end (being worked on). All versions uses PostgreSQL as the database. The most updated versions is Django or Django with React. Flask version is quite outdated.

The Django and Django with React version contains some new features along with updated code (compared to Flask). Both Django versions can be run using docker-compose. These versions also do not contain any of the testing.

Each version has it's own README.md file.

# Event Tracking Web App
Users can sign up using their email/username, password (which are hashed and not plaintext), and a zip code. These three information will then be saved into a PostgreSQL database.

When the user tried to login, we query the database for matching credentials. If matching, the user is now logged in.

On the homepage, we make an API call to Ticketmaster using the current logged in user's zip code. Tickmaster will then send back a JSON containing events based on that zip code.

If no events exist, the user may also search for events using keywords such as "baseball", "concerts", "comedy", etc. You can also search with zip codes.

Each event that is displayed is also clickable to see even more details of that specific event Along with weather for the location and a general location/map with parking and ATMS.

There is also a profile component in which the user can add the specific event into a personal list. They may also delete it.