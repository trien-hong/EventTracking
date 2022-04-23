# URL to Website
[Follow the link here to see my Heroku app](https://swe-event-tracking-final.herokuapp.com/)

# Contributors
1. Trien Hong
2. Michelle Serrano
3. Nhi Tran
4. Chengpeng Wu
5. Abdisamed Abdulhakim

# Technologies Used
### Frameworks

**Flask** is a framework used to create a web application.

### Libraries

***Requests*** is an HTTP library. This library lets you get information from HTML to python (HTTP requests).

***Flask_login*** is a library that provides different functionality that is usually handled for a user to login. 
It allows the user to login, logout, sessions, and allowing for specific routes to be decorated with `@login_required`.

**Pyscog2-binary** is a library that allows the connection between Python and PostgresSQL (Database Management System).

# Other Technology

### Flask-SQLAlchemy
For this final project we used Flask-SQLAlchemy which provided us with the ability to use SQLAlchemy with Flask. SQLAlchemy is a library which basically allows the use of databases with Python. For this project we had to create a database and we use python/Flask in order to communicate with the database.

### Boostrap
We also used bootstrap for some of our styling. Bootstrap helps make the app look consistent and adds some extra styling.

# APIs Used

### Ticketmaster API
This API helps get information for different kind of events, such as concerts and sports games. In order to display information about the events such as, title, poster, price range, and location, requests were made to the Ticketmaster API. With the help of ***JSON***, which allowed to view data being called from the API, in a formatted way, we were able to see the data received from Ticketmaster.

### The Maps JavaScript (Google) API
We used the Google Maps API to find a way to get the map of a specific event to display on the event's details page.

### Weather API
We used the Weather API to get the current weather of the event location. We would have liked to add a forecast. However, the event dates are so spread out. Some events are 2-3+ months ahead of the cuerrent date.

# Forking/Cloning the repository
Before forking the repository, certain **installations** need to be made (they can be found below). In your terminal use the command: `git clone < copy and paste ssh url link here>`
Now you should be able to open up the source code within your own IDE. Below you will find API Key Instructions that need to be followed in order to be able to access data. From here you are able to modify the project, and eventually run your project locally with the command `python3 app.py`.

## Installations for forking
1. Install Flask
2. Install requests
3. Install JSON
4. Install dotenv
5. Install Black
6. Install flask_login
7. Install psycopg2-binary
8. Install Flask-SQLAlchemy==2.1
9. Install postgresql
10. Install waitress

# API Key Instructions
In order to properly access information from the Ticketmaster API, you must request an API key at their site. [Follow the link here](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/). Next, you will need to request a The Maps Javascript (Google) API key in order to be able to access the map. [Follow the link here](https://developers.google.com/maps/documentation/javascript/overview). Finally, you will need to request the Weather API to get the current weather data. [Follow the link here](https://openweathermap.org/api).
Once you have your API key, create a .env file in the project folder. Within the .env file create a variable TICKETMASTER_API_KEY and GOOGLEMAP_API_KEY; set them equal
to your API keys respectively.
Example:
`TICKETMASTER_API_KEY="your key here"`
`GOOGLEMAP_API_KEY="your key here"`
`OPENWEATHERMAP_API_KEY="your key here"`

In addition to those three API keys, you will need a key for your DATABASE url and a SECRET key.
For the database URL, an option your have to create your database URL is creating a Heroku account, and a database. Run the following commands to obtain a database URL:
1. `heroku addons:create heroku-postgresql:hobby-dev`
2. `heroku config (copy output)`
3. `Export DATABASE_URL='copy-paste-value-in-here`
Then you will add this key, Example: `DATABASE_URL="your DB url here"`, in your .env file.
Make sure to add this: Example: `SECRET_KEY="your secret key here"` as well.
Your secret_key can be anything you want. Just make sure it's a pretty decent key and not "123" or "password".

These secret keys must be put into your .env file to keep the information private. When you clone the github repo, the .env file will not be provided for you, you must create your own .env file within your project folder. The DB URL key will allow access to the DB URL in order to connect with the database you have created. Within the main method of app.py, you'll need to change server to app.run(). You should now be able to run the project locally, accessing data from the APIs.

# Linting
* E1101 - I read online that I'm suppose to install pylint for flask
* W1508 - Says that it was expecting a string but the variable is a string
* R0903 - We don't need public functions in file, just the class for database
* C0103 - Sometimes you're just so use to camel case and forget pylint likes snake cases more.
* C0301 - Some of the dictionaries within testing are very long
* W0622 - I know that zip is a function and it is telling us to rename but though if we did, we would have to rename every zip word throughout app.py
* R0913 - Too many arguments but we have no choice
* R0914 - Too many local variables but we also have no choice on this
* R0912 - Too many branches (we're assuming becuse of the if statements) but it's in the heat of the moment fix
* R1702 - Too many nested block (we're also assuming because of the if statements) also in the heat of the moment fix

References: 
We used [this link](https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript) for Google Maps.
