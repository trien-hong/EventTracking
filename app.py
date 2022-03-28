import flask
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = flask.Flask(__name__)

@app.route("/")
def index():
    return 



app.run()

