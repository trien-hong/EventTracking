import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

def getEvents(zipcode: str):
    TICKERTMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    url = "https://app.ticketmaster.com/discovery/v2/events?apikey=" + TICKERTMASTER_API_KEY + "&postalCode=" + zipcode + "&locale=*"

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()

    idList = []
    nameList = []
    imageList = []
    #addressList = []

    for x in ticketmaster_response_json["_embedded"]["events"]:
        idList.append(x["id"])
        nameList.append(x["name"])
        imageList.append(x["images"][3]["url"])
        #addressList.append(x["_embedded"]["venues"][0]["name"] + " " + x["_embedded"]["venues"][0]["address"]["line1"] + ", " + x["_embedded"]["venues"][0]["city"]["name"] + ", " + x["_embedded"]["venues"][0]["state"]["name"] + " " + x["_embedded"]["venues"][0]["postalCode"])
    
    return zip(idList, nameList, imageList)