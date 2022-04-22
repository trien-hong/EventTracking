import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())


def getWeather(lat: str, lon: str):
    """
    This function is to get the weather information for the event venue location
    """
    if lat == "TBD" or lon == "TBD":
        weather_details = {
            "temperature_f": "N/A",
            "temperature_min_f": "N/A",
            "temperature_max_f": "N/A",
            "temperature_c": "N/A",
            "temperature_min_c": "N/A",
            "temperature_max_c": "N/A",
            "weather_icon": "N/A",
            "weather_description": "N/A",
            "humidity": "N/A",
            "wind": "N/A",
        }
        return weather_details

    OPENWEATHERMAP_API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")

    url = (
        "https://api.openweathermap.org/data/2.5/weather?lat="
        + lat
        + "&lon="
        + lon
        + "&appid="
        + OPENWEATHERMAP_API_KEY
    )

    openweathermap_request = requests.get(url=url)

    openweathermap_response_json = openweathermap_request.json()

    if "main" in openweathermap_response_json:
        if "temp" in openweathermap_response_json["main"]:
            temperature_f = round(
                (openweathermap_response_json["main"]["temp"] - 273.15) * 9 / 5 + 32, 2
            )
            temperature_c = round(
                openweathermap_response_json["main"]["temp"] - 273.15, 2
            )
    else:
        temperature_f = "N/A"
        temperature_c = "N/A"

    if "main" in openweathermap_response_json:
        if "temp_min" in openweathermap_response_json["main"]:
            temperature_min_f = round(
                (openweathermap_response_json["main"]["temp_min"] - 273.15) * 9 / 5
                + 32,
                2,
            )
            temperature_min_c = round(
                openweathermap_response_json["main"]["temp_min"] - 273.15, 2
            )
    else:
        temperature_min_f = "N/A"
        temperature_min_c = "N/A"

    if "main" in openweathermap_response_json:
        if "temp_max" in openweathermap_response_json["main"]:
            temperature_max_f = round(
                (openweathermap_response_json["main"]["temp_max"] - 273.15) * 9 / 5
                + 32,
                2,
            )
            temperature_max_c = round(
                openweathermap_response_json["main"]["temp_max"] - 273.15, 2
            )
    else:
        temperature_max_f = "N/A"
        temperature_max_c = "N/A"

    if "weather" in openweathermap_response_json:
        if "icon" in openweathermap_response_json["weather"][0]:
            weather_icon = openweathermap_response_json["weather"][0]["icon"]
    else:
        weather_icon = "N/A"

    if "weather" in openweathermap_response_json:
        if "description" in openweathermap_response_json["weather"][0]:
            weather_description = openweathermap_response_json["weather"][0][
                "description"
            ]
    else:
        weather_description = "N/A"

    if "main" in openweathermap_response_json:
        if "humidity" in openweathermap_response_json["main"]:
            humidity = openweathermap_response_json["main"]["humidity"]
    else:
        humidity = "N/A"

    if "wind" in openweathermap_response_json:
        if "speed" in openweathermap_response_json["wind"]:
            wind = openweathermap_response_json["wind"]["speed"]
    else:
        wind = "N/A"

    weather_details = {
        "temperature_f": temperature_f,
        "temperature_min_f": temperature_min_f,
        "temperature_max_f": temperature_max_f,
        "temperature_c": temperature_c,
        "temperature_min_c": temperature_min_c,
        "temperature_max_c": temperature_max_c,
        "weather_icon": weather_icon,
        "weather_description": weather_description,
        "humidity": humidity,
        "wind": wind,
    }

    return weather_details


def openWeatherMapTest1(lat: str, lon: str):
    return [float(lat), float(lon)]


def openWeatherMapTest2(kelvin: int):
    return round((kelvin - 273.15) * 9 / 5 + 32, 2)


def openWeatherMapTest3(kelvin: int):
    return round(kelvin - 273.15, 2)
