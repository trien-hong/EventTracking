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

    for x in ticketmaster_response_json["_embedded"]["events"]:
        idList.append(x["id"])
        nameList.append(x["name"])
        imageList.append(x["images"][0]["url"])
    
    return zip(idList, nameList, imageList)

def getEventDetails(eventId: str):
    TICKERTMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    url = "https://app.ticketmaster.com/discovery/v2/events/" + eventId + "?apikey=" + TICKERTMASTER_API_KEY + "&locale=*"

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()    

    eventDetails = {
        "name": ticketmaster_response_json["name"],
        "eventImageURL": ticketmaster_response_json["images"][0]["url"],
        "startDate": ticketmaster_response_json["dates"]["start"]["localDate"],
        "genre": ticketmaster_response_json["classifications"][0]["genre"]["name"],\
        "minPrice": ticketmaster_response_json["priceRanges"][0]["min"],
        "maxPrice": ticketmaster_response_json["priceRanges"][0]["max"],
        "venue": ticketmaster_response_json["_embedded"]["venues"][0]["name"],
        "address": ticketmaster_response_json["_embedded"]["venues"][0]["address"]["line1"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["state"]["name"] + " " + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"],
        "longitude": ticketmaster_response_json["_embedded"]["venues"][0]["location"]["longitude"],
        "latitude": ticketmaster_response_json["_embedded"]["venues"][0]["location"]["latitude"]
    }

    return eventDetails