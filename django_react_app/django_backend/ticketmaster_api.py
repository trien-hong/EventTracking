import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

def getEvents(input, size, page, sort):
    TICKETMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

    if len(input) == 5 and input.isnumeric():
        url = (
            "https://app.ticketmaster.com/discovery/v2/events?apikey="
            + TICKETMASTER_API_KEY
            + "&postalCode="
            + input
            + "&locale=*"
            + "&size="
            + size
            + "&page="
            + page
            + "&sort="
            + sort
        )
    else:
        url = (
            "https://app.ticketmaster.com/discovery/v2/events?apikey="
            + TICKETMASTER_API_KEY
            + "&keyword="
            + input
            + "&locale=*"
            + "&size="
            + size
            + "&page="
            + page
            + "&sort="
            + sort
        )

    ticketmaster_request = requests.get(url=url)

    ticketmaster_response_json = ticketmaster_request.json()

    events = []
    event = {}
    totalPages = {}

    try:
        for i in ticketmaster_response_json["_embedded"]["events"]:
            event = {}
            
            try:
                event["event_id"] = i["id"]
            except KeyError as e:
                event["event_id"] = "TBD"

            try:
                event["title"] = i["name"]
            except KeyError as e:
                event["title"] = "TBD"
            
            try:
                event["imageUrl"] = i["images"][0]["url"]
            except KeyError as e:
                event["imageUrl"] = "TBD"

            try:
                event["date"] = i["dates"]["start"]["localDate"]
            except KeyError as e:
                event["date"] = "TBD"

            try:
                event["city"] = i["_embedded"]["venues"][0]["city"]["name"]
            except KeyError as e:
                event["city"] = "TBD"
            
            try:
                event["minPrice"] = "$" + str(i["priceRanges"][0]["min"])
            except KeyError as e:
                event["minPrice"] = "TBD"

            try:
                event["maxPrice"] = "$" + str(i["priceRanges"][0]["max"])
            except KeyError as e:
                event["maxPrice"] = "TBD"

            events.append(event)
        
        try:
            # the size (number of items per page) * page (max number of pages) must be less than 1000
            # for example if the size is 12... floor(1000/12) = 83. therefore max number of pages is 83.
            if size == "9":
                if ticketmaster_response_json["page"]["totalPages"] >= 112:
                    totalPages["totalPages"] = 111
                else:
                    totalPages["totalPages"] = int(ticketmaster_response_json["page"]["totalPages"]) - 1
            elif size == "12":
                if ticketmaster_response_json["page"]["totalPages"] >= 84:
                    totalPages["totalPages"] = 83
                else:
                    totalPages["totalPages"] = int(ticketmaster_response_json["page"]["totalPages"]) - 1
            elif size == "15":
                if ticketmaster_response_json["page"]["totalPages"] >= 67:
                    totalPages["totalPages"] = 66
                else:
                    totalPages["totalPages"] = int(ticketmaster_response_json["page"]["totalPages"]) - 1
            elif size == "18":
                if ticketmaster_response_json["page"]["totalPages"] >= 56:
                    totalPages["totalPages"] = 55
                else:
                    totalPages["totalPages"] = int(ticketmaster_response_json["page"]["totalPages"]) - 1
            events.append(totalPages)
        except KeyError as e:
            totalPages["totalPages"] = 0
            events.append(totalPages)
    except KeyError as e:
        return False

    return events

def getEventsDetails(eventId):
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
        startTime = ticketmaster_response_json["dates"]["start"]["localTime"]
    except KeyError as e:
        startTime = "TBD"

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
        state = ticketmaster_response_json["_embedded"]["venues"][0]["state"]["stateCode"]
    except KeyError as e:
        state = False

    try:
        city = ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"]
    except KeyError as e:
        city = False

    if state == False:
        try:
            address = ticketmaster_response_json["_embedded"]["venues"][0]["address"]["line1"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"]
        except:
            address = "TBD"
    else:
        try:
            address = ticketmaster_response_json["_embedded"]["venues"][0]["address"]["line1"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["state"]["stateCode"] + " " + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"]
        except KeyError as e:
            address = "TBD"

    try:
        latitude = float(ticketmaster_response_json["_embedded"]["venues"][0]["location"]["latitude"])
        longitude = float(ticketmaster_response_json["_embedded"]["venues"][0]["location"]["longitude"])
    except KeyError as e:
        latitude = "TBD"
        longitude = "TBD"
    
    event_details = {
        "event_id": event_id,
        "title": title,
        "imageUrl": imageUrl,
        "date": date,
        "startTime": startTime,
        "genre": genre,
        "minPrice": minPrice,
        "maxPrice": maxPrice,
        "city": city,
        "venu": venue,
        "address": address,
        "latitude": latitude,
        "longitude": longitude
    }

    return event_details

# import os
# import requests
# from dotenv import find_dotenv, load_dotenv

# load_dotenv(find_dotenv())

# def getEvents(input, size, page, sort):
#     TICKETMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

#     if len(input) == 5 and input.isnumeric():
#         url = (
#             "https://app.ticketmaster.com/discovery/v2/events?apikey="
#             + TICKETMASTER_API_KEY
#             + "&postalCode="
#             + input
#             + "&locale=*"
#             + "&size"
#             + size
#             + "&page="
#             + page
#             + "&sort=name,asc"
#         )
#     else:
#         url = (
#             "https://app.ticketmaster.com/discovery/v2/events?apikey="
#             + TICKETMASTER_API_KEY
#             + "&keyword="
#             + input
#             + "&locale=*"
#             + "&size"
#             + size
#             + "&page="
#             + page
#             + "&sort=name,asc"
#         )

#     ticketmaster_request = requests.get(url=url)

#     ticketmaster_response_json = ticketmaster_request.json()

#     events = []
#     event = {}
#     totalPages = {}

#     try:
#         for x in ticketmaster_response_json["_embedded"]["events"]:
#             event = {}
            
#             try:
#                 event["event_id"] = x["id"]
#             except KeyError as e:
#                 event["event_id"] = "TBD"

#             try:
#                 event["title"] = x["name"]
#             except KeyError as e:
#                 event["title"] = "TBD"
            
#             try:
#                 event["imageUrl"] = x["images"][0]["url"]
#             except KeyError as e:
#                 event["imageUrl"] = "TBD"

#             try:
#                 event["date"] = x["dates"]["start"]["localDate"]
#             except KeyError as e:
#                 event["date"] = "TBD"

#             try:
#                 event["city"] = x["_embedded"]["venues"][0]["city"]["name"]
#             except KeyError as e:
#                 event["city"] = "TBD"
            
#             try:
#                 event["minPrice"] = "$" + str(x["priceRanges"][0]["min"])
#             except KeyError as e:
#                 event["minPrice"] = "TBD"

#             try:
#                 event["maxPrice"] = "$" + str(x["priceRanges"][0]["max"])
#             except KeyError as e:
#                 event["maxPrice"] = "TBD"

#             events.append(event)
        
#         try:
#             #(size * page) <= 1000 items otherwise error 400
#             #(12 * 83) <= 1000 items therefore max page is 83
#             if ticketmaster_response_json["page"]["totalPages"] >= 84:
#                 totalPages["totalPages"] = 83
#             else:
#                 totalPages["totalPages"] = int(ticketmaster_response_json["page"]["totalPages"]) - 1
#             events.append(totalPages)
#         except KeyError as e:
#             totalPages["totalPages"] = 0
#             events.append(totalPages)
#     except KeyError as e:
#         return False

#     return events

# def getEventsDetails(eventId):
#     TICKETMASTER_API_KEY = os.getenv("TICKETMASTER_API_KEY")

#     url = (
#         "https://app.ticketmaster.com/discovery/v2/events/"
#         + eventId
#         + "?apikey="
#         + TICKETMASTER_API_KEY
#         + "&locale=*"
#     )

#     ticketmaster_request = requests.get(url=url)

#     ticketmaster_response_json = ticketmaster_request.json()

#     try:
#         event_id = ticketmaster_response_json["id"]
#     except KeyError as e:
#         event_id = "TBD"

#     try:
#         title = ticketmaster_response_json["name"]
#     except KeyError as e:
#         title = "TBD"

#     try:
#         imageUrl = ticketmaster_response_json["images"][0]["url"]
#     except KeyError as e:
#         imageUrl = "TBD"
    
#     try:
#         date = ticketmaster_response_json["dates"]["start"]["localDate"]
#     except KeyError as e:
#         date = "TBD"

#     try:
#         startTime = ticketmaster_response_json["dates"]["start"]["localTime"]
#     except KeyError as e:
#         startTime = "TBD"

#     try:
#         genre = ticketmaster_response_json["classifications"][0]["genre"]["name"]
#     except KeyError as e:
#         genre = "TBD/NA"

#     try:
#         minPrice = "$" + str(ticketmaster_response_json["priceRanges"][0]["min"])
#     except KeyError as e:
#         minPrice = "TBD"

#     try:
#         maxPrice = "$" + str(ticketmaster_response_json["priceRanges"][0]["max"])
#     except KeyError as e:
#         maxPrice = "TBD"

#     try:
#         venue = ticketmaster_response_json["_embedded"]["venues"][0]["name"]
#     except KeyError as e:
#         venue = "TBD"

#     try:
#         state = ticketmaster_response_json["_embedded"]["venues"][0]["state"]["stateCode"]
#     except KeyError as e:
#         state = False

#     try:
#         city = ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"]
#     except KeyError as e:
#         city = False

#     if state == False:
#         try:
#             address = ticketmaster_response_json["_embedded"]["venues"][0]["address"]["line1"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"]
#         except:
#             address = "TBD"
#     else:
#         try:
#             address = ticketmaster_response_json["_embedded"]["venues"][0]["address"]["line1"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["city"]["name"] + ", " + ticketmaster_response_json["_embedded"]["venues"][0]["state"]["stateCode"] + " " + ticketmaster_response_json["_embedded"]["venues"][0]["postalCode"]
#         except KeyError as e:
#             address = "TBD"

#     try:
#         latitude = float(ticketmaster_response_json["_embedded"]["venues"][0]["location"]["latitude"])
#         longitude = float(ticketmaster_response_json["_embedded"]["venues"][0]["location"]["longitude"])
#     except KeyError as e:
#         latitude = "TBD"
#         longitude = "TBD"
    
#     event_details = {
#         "event_id": event_id,
#         "title": title,
#         "imageUrl": imageUrl,
#         "date": date,
#         "startTime": startTime,
#         "genre": genre,
#         "minPrice": minPrice,
#         "maxPrice": maxPrice,
#         "city": city,
#         "venu": venue,
#         "address": address,
#         "latitude": latitude,
#         "longitude": longitude
#     }

#     return event_details