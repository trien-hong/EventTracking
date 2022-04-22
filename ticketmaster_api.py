# pylint: disable=C0103, R1702, R0912

"""
SWE Final Project | Event Tracking
"""

import time
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

        if "page" in ticketmaster_response_json:
            if "totalElements" in ticketmaster_response_json["page"]:
                if ticketmaster_response_json["page"]["totalElements"] == 0:
                    return False, False, False, False, False, False, False

        idList = []
        nameList = []
        imageList = []
        dateList = []
        cityList = []
        minPriceList = []
        maxPriceList = []

        time.sleep(5)

        index = 0
        for x in ticketmaster_response_json["_embedded"]["events"]:
            idList.append(x["id"])
            nameList.append(x["name"])
            imageList.append(x["images"][0]["url"])
            if "dates" in ticketmaster_response_json["_embedded"]["events"][index]:
                if (
                    "start"
                    in ticketmaster_response_json["_embedded"]["events"][index]["dates"]
                ):
                    if (
                        "localDate"
                        in ticketmaster_response_json["_embedded"]["events"][index][
                            "dates"
                        ]["start"]
                    ):
                        dateList.append(x["dates"]["start"]["localDate"])
            else:
                dateList.append("TBD")
            if "_embedded" in ticketmaster_response_json["_embedded"]["events"][index]:
                if (
                    "venues"
                    in ticketmaster_response_json["_embedded"]["events"][index][
                        "_embedded"
                    ]
                ):
                    if (
                        "city"
                        in ticketmaster_response_json["_embedded"]["events"][index][
                            "_embedded"
                        ]["venues"][0]
                    ):
                        if (
                            "name"
                            in ticketmaster_response_json["_embedded"]["events"][index][
                                "_embedded"
                            ]["venues"][0]["city"]
                        ):
                            cityList.append(x["_embedded"]["venues"][0]["city"]["name"])
            else:
                cityList.append("TBD")
            if (
                "priceRanges"
                in ticketmaster_response_json["_embedded"]["events"][index]
            ):
                if (
                    "min"
                    in ticketmaster_response_json["_embedded"]["events"][index][
                        "priceRanges"
                    ][0]
                ):
                    minPriceList.append("$" + str(x["priceRanges"][0]["min"]))
            else:
                minPriceList.append("TBD")
            if (
                "priceRanges"
                in ticketmaster_response_json["_embedded"]["events"][index]
            ):
                if (
                    "max"
                    in ticketmaster_response_json["_embedded"]["events"][index][
                        "priceRanges"
                    ][0]
                ):
                    maxPriceList.append("$" + str(x["priceRanges"][0]["max"]))
            else:
                maxPriceList.append("TBD")
            index = index + 1
        return (
            idList,
            nameList,
            imageList,
            dateList,
            cityList,
            minPriceList,
            maxPriceList,
        )
    return ""


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

    time.sleep(1)

    name = ticketmaster_response_json["name"]
    eventImageURL = ticketmaster_response_json["images"][0]["url"]
    if "dates" in ticketmaster_response_json:
        if "start" in ticketmaster_response_json["dates"]:
            if "localDate" in ticketmaster_response_json["dates"]["start"]:
                startDate = ticketmaster_response_json["dates"]["start"]["localDate"]
    else:
        startDate = "TBD"
    if "classifications" in ticketmaster_response_json:
        if "genre" in ticketmaster_response_json["classifications"][0]:
            if "name" in ticketmaster_response_json["classifications"][0]["genre"]:
                genre = ticketmaster_response_json["classifications"][0]["genre"][
                    "name"
                ]
    else:
        genre = "TBD"
    if "priceRanges" in ticketmaster_response_json:
        if "min" in ticketmaster_response_json["priceRanges"][0]:
            minPrice = "$" + str(ticketmaster_response_json["priceRanges"][0]["min"])
    else:
        minPrice = "TBD"
    if "priceRanges" in ticketmaster_response_json:
        if "max" in ticketmaster_response_json["priceRanges"][0]:
            maxPrice = "$" + str(ticketmaster_response_json["priceRanges"][0]["max"])
    else:
        maxPrice = "TBD"
    if "_embedded" in ticketmaster_response_json:
        if "venues" in ticketmaster_response_json["_embedded"]:
            if "name" in ticketmaster_response_json["_embedded"]["venues"][0]:
                venue = ticketmaster_response_json["_embedded"]["venues"][0]["name"]
    else:
        venue = "TBD"
    if "_embedded" in ticketmaster_response_json:
        if "venues" in ticketmaster_response_json["_embedded"]:
            if "address" in ticketmaster_response_json["_embedded"]["venues"][0]:
                address = (
                    ticketmaster_response_json["_embedded"]["venues"][0]["address"][
                        "line1"
                    ]
                    + ", "
                    + ticketmaster_response_json["_embedded"]["venues"][0]["city"][
                        "name"
                    ]
                    + ", "
                    + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"]
                )
    else:
        address = "TBD"
    if "_embedded" in ticketmaster_response_json:
        if "venues" in ticketmaster_response_json["_embedded"]:
            if "location" in ticketmaster_response_json["_embedded"]["venues"][0]:
                longitude = ticketmaster_response_json["_embedded"]["venues"][0][
                    "location"
                ]["longitude"]
                latitude = ticketmaster_response_json["_embedded"]["venues"][0][
                    "location"
                ]["latitude"]
    else:
        longitude = "TBD"
        latitude = "TBD"
    return (
        name,
        eventImageURL,
        startDate,
        genre,
        minPrice,
        maxPrice,
        venue,
        address,
        longitude,
        latitude,
    )


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

    if "page" in ticketmaster_response_json:
        if "totalElements" in ticketmaster_response_json["page"]:
            if ticketmaster_response_json["page"]["totalElements"] == 0:
                return False

    idList = []
    nameList = []
    imageList = []
    dateList = []
    cityList = []
    minPriceList = []
    maxPriceList = []

    time.sleep(5)

    index = 0
    for x in ticketmaster_response_json["_embedded"]["events"]:
        idList.append(x["id"])
        nameList.append(x["name"])
        imageList.append(x["images"][0]["url"])
        if "dates" in ticketmaster_response_json["_embedded"]["events"][index]:
            if (
                "start"
                in ticketmaster_response_json["_embedded"]["events"][index]["dates"]
            ):
                if (
                    "localDate"
                    in ticketmaster_response_json["_embedded"]["events"][index][
                        "dates"
                    ]["start"]
                ):
                    dateList.append(x["dates"]["start"]["localDate"])
        else:
            dateList.append("TBD")
        if "_embedded" in ticketmaster_response_json["_embedded"]["events"][index]:
            if (
                "venues"
                in ticketmaster_response_json["_embedded"]["events"][index]["_embedded"]
            ):
                if (
                    "city"
                    in ticketmaster_response_json["_embedded"]["events"][index][
                        "_embedded"
                    ]["venues"][0]
                ):
                    if (
                        "name"
                        in ticketmaster_response_json["_embedded"]["events"][index][
                            "_embedded"
                        ]["venues"][0]["city"]
                    ):
                        cityList.append(x["_embedded"]["venues"][0]["city"]["name"])
        else:
            cityList.append("TBD")
        if "priceRanges" in ticketmaster_response_json["_embedded"]["events"][index]:
            if (
                "min"
                in ticketmaster_response_json["_embedded"]["events"][index][
                    "priceRanges"
                ][0]
            ):
                minPriceList.append("$" + str(x["priceRanges"][0]["min"]))
        else:
            minPriceList.append("TBD")
        if "priceRanges" in ticketmaster_response_json["_embedded"]["events"][index]:
            if (
                "max"
                in ticketmaster_response_json["_embedded"]["events"][index][
                    "priceRanges"
                ][0]
            ):
                maxPriceList.append("$" + str(x["priceRanges"][0]["max"]))
        else:
            maxPriceList.append("TBD")
        index = index + 1
    return zip(
        idList, nameList, imageList, dateList, cityList, minPriceList, maxPriceList
    )
