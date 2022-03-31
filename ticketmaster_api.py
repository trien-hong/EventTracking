import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

TICKERTMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")
zipcode = "90028"

url = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + TICKERTMASTER_API_KEY + "&postalCode=" + zipcode + "&locale=*"

ticketmaster_request = requests.get(url=url)

ticketmaster_response_json = ticketmaster_request.json()

for x in ticketmaster_response_json["_embedded"]["events"]:
    print(x["name"])
    print(x["images"][3]["url"])
    print(x["_embedded"]["venues"][0]["name"] + " " + x["_embedded"]["venues"][0]["address"]["line1"] + ", " + x["_embedded"]["venues"][0]["city"]["name"] + ", " + x["_embedded"]["venues"][0]["state"]["name"] + " " + x["_embedded"]["venues"][0]["postalCode"])