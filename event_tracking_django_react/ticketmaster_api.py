import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

def getEvents(input):
    TICKETMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    if len(input) == 5 and input.isnumeric():
        url = (
            "https://app.ticketmaster.com/discovery/v2/events?apikey="
            + TICKETMASTER_API_KEY
            + "&postalCode="
            + input
            + "&locale=*"
        )
    else:
        url = (
            "https://app.ticketmaster.com/discovery/v2/events?apikey="
            + TICKETMASTER_API_KEY
            + "&keyword="
            + input
            + "&locale=*"
        )

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()

    events = []
    event = {}

    try:
        for x in ticketmaster_response_json["_embedded"]["events"]:
            event = {}
            
            try:
                event["event_id"] = x["id"]
            except KeyError as e:
                event["event_id"] = "TBD"

            try:
                event["title"] = x["name"]
            except KeyError as e:
                event["title"] = "TBD"
            
            try:
                event["imageUrl"] = x["images"][0]["url"]
            except KeyError as e:
                event["imageUrl"] = "TBD"

            try:
                event["date"] = x["dates"]["start"]["localDate"]
            except KeyError as e:
                event["date"] = "TBD"

            try:
                event["city"] = x["_embedded"]["venues"][0]["city"]["name"]
            except KeyError as e:
                event["city"] = "TBD"
            
            try:
                event["minPrice"] = "$" + str(x["priceRanges"][0]["min"])
            except KeyError as e:
                event["minPrice"] = "TBD"

            try:
                event["maxPrice"] = "$" + str(x["priceRanges"][0]["max"])
            except KeyError as e:
                event["maxPrice"] = "TBD"

            events.append(event)
    except KeyError as e:
        return False

    return events

def getEventDetails(eventId):
    TICKETMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    url = (
        "https://app.ticketmaster.com/discovery/v2/events/"
        + eventId
        + "?apikey="
        + TICKETMASTER_API_KEY
        + "&locale=*"
    )

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()

    try:
        event_id = ticketmaster_response_json["id"]
    except KeyError as e:
        event_id = "TBD"

    try:
        title = ticketmaster_response_json["name"]
    except KeyError as e:
        title = "TBD"

    try:
        imageUrl = ticketmaster_response_json["images"][0]["url"]
    except KeyError as e:
        imageUrl = "TBD"
    
    try:
        date = ticketmaster_response_json["dates"]["start"]["localDate"]
    except KeyError as e:
        date = "TBD"

    try:
        genre = ticketmaster_response_json["classifications"][0]["genre"]["name"]
    except KeyError as e:
        genre = "TBD/NA"
    
    try:
        minPrice = "$" + str(ticketmaster_response_json["priceRanges"][0]["min"])
    except KeyError as e:
        minPrice = "TBD"

    try:
        maxPrice = "$" + str(ticketmaster_response_json["priceRanges"][0]["max"])
    except KeyError as e:
        maxPrice = "TBD"

    try:
        venue = ticketmaster_response_json["_embedded"]["venues"][0]["name"]
    except KeyError as e:
        venue = "TBD"

    try:
        address = ticketmaster_response_json["_embedded"]["venues"][0]["address"]["line1"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["state"]["stateCode"] + " " + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"]
    except KeyError as e:
        address = "TBD"

    try:
        latitude = ticketmaster_response_json["_embedded"]["venues"][0]["location"]["latitude"]
        longitude = ticketmaster_response_json["_embedded"]["venues"][0]["location"]["longitude"]
    except KeyError as e:
        latitude = "TBD"
        longitude = "TBD"
    
    event_details = {
        "event_id": event_id,
        "title": title,
        "imageUrl": imageUrl,
        "date": date,
        "genre": genre,
        "minPrice": minPrice,
        "maxPrice": maxPrice,
        "venu": venue,
        "address": address,
        "latitude": latitude,
        "longitude": longitude
    }

    return event_details