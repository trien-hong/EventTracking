import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

def getEventsWeather(latitude, longitude):
    OPENWEATHERMAP_API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")

    url = (
        "https://api.openweathermap.org/data/2.5/weather?lat="
        + latitude
        + "&lon="
        + longitude
        + "&appid="
        + OPENWEATHERMAP_API_KEY
    )

    openweathermap_request = requests.get(url=url)

    openweathermap_response_json = openweathermap_request.json()

    try:
        weather_icon = "http://openweathermap.org/img/wn/" + openweathermap_response_json["weather"][0]["icon"] + "@2x.png"
    except KeyError as e:
        weather_icon = "N/A"

    try:
        weather_description = openweathermap_response_json["weather"][0]["description"]
    except KeyError as e:
        weather_description = "N/A"

    try:
        temperature_f = round((openweathermap_response_json["main"]["temp"] - 273.15) * 9 / 5 + 32, 2)
    except KeyError as e:
        temperature_f = "N/A"

    try:    
        temperature_c = round(openweathermap_response_json["main"]["temp"] - 273.15, 2)
    except KeyError as e:
        temperature_c = "N/A"
    
    try:
        temperature_min_f = round((openweathermap_response_json["main"]["temp_min"] - 273.15) * 9 / 5 + 32, 2)
    except KeyError as e:
        temperature_min_f = "N/A"
    
    try:
        temperature_min_c = round(openweathermap_response_json["main"]["temp_min"] - 273.15, 2)
    except KeyError as e:
        temperature_min_c = "N/A"
    
    try:
        temperature_max_f = round((openweathermap_response_json["main"]["temp_max"] - 273.15) * 9 / 5 + 32, 2)
    except KeyError as e:
        temperature_max_f = "N/A"

    try:
        temperature_max_c = round(openweathermap_response_json["main"]["temp_max"] - 273.15, 2)
    except KeyError as e:
        temperature_max_c = "N/A"

    weather_details = {
        "weather_icon": weather_icon,
        "weather_description": weather_description,
        "temperature_f": temperature_f,
        "temperature_c": temperature_c,
        "temperature_min_f": temperature_min_f,
        "temperature_min_c": temperature_min_c,
        "temperature_max_f": temperature_max_f,
        "temperature_max_c": temperature_max_c,
    }

    return weather_details