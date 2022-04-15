# pylint: disable=C0103

"""
SWE Final Project | Event Tracking
"""

import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())


def getEvents(parameter: str):
    """
    This function was used to get the events
    """
    TICKERTMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    if len(parameter) == 5 and parameter.isnumeric():
        url = (
            "https://app.ticketmaster.com/discovery/v2/events?apikey="
            + TICKERTMASTER_API_KEY
            + "&postalCode="
            + parameter
            + "&locale=*"
        )

        ticketmaster_request = requests.get(url=url)

        ticketmaster_response_json = ticketmaster_request.json()

        idList = []
        nameList = []
        imageList = []
        dateList = []
        cityList = []
        stateList = []
        minPriceList = []
        maxPriceList = []

        index = 0
        for x in ticketmaster_response_json["_embedded"]["events"]:
            idList.append(x["id"])
            nameList.append(x["name"])
            imageList.append(x["images"][0]["url"])
            dateList.append(x["dates"]["start"]["localDate"])
            cityList.append(x["_embedded"]["venues"][0]["city"]["name"])
            stateList.append(x["_embedded"]["venues"][0]["state"]["stateCode"])
            if "priceRanges" in ticketmaster_response_json["_embedded"]["events"][index]:
                minPriceList.append("$" + str(x["priceRanges"][0]["min"]))
                maxPriceList.append("$" + str(x["priceRanges"][0]["max"]))
            else:
                minPriceList.append("TBD")
                maxPriceList.append("TBD")
            index = index + 1
        return idList, nameList, imageList, dateList, cityList, stateList, minPriceList, maxPriceList
    url = (
        "https://app.ticketmaster.com/discovery/v2/events/"
        + parameter
        + "?apikey="
        + TICKERTMASTER_API_KEY
        + "&locale=*"
    )

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()

    event = {
        "id": ticketmaster_response_json["id"],
        "name": ticketmaster_response_json["name"],
        "eventImageURL": ticketmaster_response_json["images"][0]["url"],
    }

    return event


def getEventDetails(eventId: str):
    """
    This function was used to get the specific event details for said event.
    """
    TICKERTMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    url = (
        "https://app.ticketmaster.com/discovery/v2/events/"
        + eventId
        + "?apikey="
        + TICKERTMASTER_API_KEY
        + "&locale=*"
    )

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()
    
    if "priceRanges" in ticketmaster_response_json:
        eventDetails = {
            "name": ticketmaster_response_json["name"],
            "eventImageURL": ticketmaster_response_json["images"][0]["url"],
            "startDate": ticketmaster_response_json["dates"]["start"]["localDate"],
            "genre": ticketmaster_response_json["classifications"][0]["genre"]["name"],
            "minPrice": "$" + str(ticketmaster_response_json["priceRanges"][0]["min"]),
            "maxPrice": "$" + str(ticketmaster_response_json["priceRanges"][0]["max"]),
            "venue": ticketmaster_response_json["_embedded"]["venues"][0]["name"],
            "address": ticketmaster_response_json["_embedded"]["venues"][0]["address"][
                "line1"
            ]
            + ", "
            + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"]
            + ", "
            + ticketmaster_response_json["_embedded"]["venues"][0]["state"]["name"]
            + " "
            + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"],
            "longitude": ticketmaster_response_json["_embedded"]["venues"][0][
                "location"
            ]["longitude"],
            "latitude": ticketmaster_response_json["_embedded"]["venues"][0][
                "location"
            ]["latitude"],
        }
    else:
        eventDetails = {
            "name": ticketmaster_response_json["name"],
            "eventImageURL": ticketmaster_response_json["images"][0]["url"],
            "startDate": ticketmaster_response_json["dates"]["start"]["localDate"],
            "genre": ticketmaster_response_json["classifications"][0]["genre"]["name"],
            "minPrice": "TBD",
            "maxPrice": "TBD",
            "venue": ticketmaster_response_json["_embedded"]["venues"][0]["name"],
            "address": ticketmaster_response_json["_embedded"]["venues"][0]["address"][
                "line1"
            ]
            + ", "
            + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"]
            + ", "
            + ticketmaster_response_json["_embedded"]["venues"][0]["state"]["name"]
            + " "
            + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"],
            "longitude": ticketmaster_response_json["_embedded"]["venues"][0][
                "location"
            ]["longitude"],
            "latitude": ticketmaster_response_json["_embedded"]["venues"][0][
                "location"
            ]["latitude"],
        }

    return eventDetails


def search(userInput: str):
    """
    This function was used to get events based on the user input.
    """
    TICKERTMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    if len(userInput) == 5 and userInput.isnumeric():
        url = (
            "https://app.ticketmaster.com/discovery/v2/events?apikey="
            + TICKERTMASTER_API_KEY
            + "&postalCode="
            + userInput
            + "&locale=*"
        )
    elif userInput.isspace():
        return False
    else:
        url = (
            "https://app.ticketmaster.com/discovery/v2/events?apikey="
            + TICKERTMASTER_API_KEY
            + "&keyword="
            + userInput
            + "&locale=*"
        )

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()

    if ticketmaster_response_json["page"]["totalElements"] == 0:
        return False
    idList = []
    nameList = []
    imageList = []

    for x in ticketmaster_response_json["_embedded"]["events"]:
        idList.append(x["id"])
        nameList.append(x["name"])
        imageList.append(x["images"][0]["url"])

    return zip(idList, nameList, imageList)
