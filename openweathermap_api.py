import os
import requests
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

def getWeather(lat: str, lon: str):
    """
    
    """
    OPENWEATHERMAP_API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")

    url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + OPENWEATHERMAP_API_KEY

    openweathermap_request = requests.get(url=url)

    openweathermap_response_json = openweathermap_request.json()
    
    temperature = openweathermap_response_json["main"]["temp"]
    temperature_min = openweathermap_response_json["main"]["temp_min"]
    temperature_max = openweathermap_response_json["main"]["temp_max"]

    weather_details = {
        "temperature_f": round((temperature - 273.15) * 9/5 + 32, 2),
        "temperature_min_f": round((temperature_min - 273.15) * 9/5 + 32, 2),
        "temperature_max_f": round((temperature_max - 273.15) * 9/5 + 32, 2),
        "temperature_c": round(temperature - 273.15, 2),
        "temperature_min_c": round(temperature_min - 273.15, 2),
        "temperature_max_c": round(temperature_max - 273.15, 2),
        "weather_icon": openweathermap_response_json["weather"][0]["icon"]
    }
    
    return weather_details

def openWeatherMapTest1(lat: str, lon: str):
    return [float(lat), float(lon)]

def openWeatherMapTest2(kelvin: int):
    return round((kelvin - 273.15) * 9/5 + 32, 2)

def openWeatherMapTest3(kelvin:int):
    return round(kelvin - 273.15, 2)