# pylint: disable=C0301, C0103

"""
SWE Final Project | Event Tracking
"""

import unittest
from unittest.mock import MagicMock, patch
from ticketmaster_api import getEvents, search
from openweathermap_api import (
    getWeather,
    openWeatherMapTest1,
    openWeatherMapTest2,
    openWeatherMapTest3,
)


class TicketmasterMockedTest(unittest.TestCase):
    """
    This class is for mocked testing
    """

    def test_getEvents1(self):
        """
        Test getEvents() method within ticketmaster_api.py with zipcode as parameter
        """
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "_embedded": {
                "events": [
                    {
                        "name": "Yeat",
                        "id": "Z7r9jZ1Ad8IZk",
                        "images": [
                            {
                                "url": "https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_CUSTOM.jpg"
                            }
                        ],
                        "dates": {"start": {"localDate": "2022-10-10"}},
                        "_embedded": {
                            "venues": [
                                {
                                    "city": {"name": "Hollywood"},
                                }
                            ]
                        },
                    }
                ],
            },
            "page": {
                "totalElements": 800,
            },
        }

        with patch("ticketmaster_api.requests.get") as mock_requests_get:
            mock_requests_get.return_value = mock_response

            self.assertEqual(
                getEvents("90028"),
                (
                    ["Z7r9jZ1Ad8IZk"],
                    ["Yeat"],
                    [
                        "https://s1.ticketm.net/dam/c/060/c5c08e7a-9912-456c-a060-2758be94e060_105881_CUSTOM.jpg"
                    ],
                    ["2022-10-10"],
                    ["Hollywood"],
                    ["TBD"],
                    ["TBD"],
                ),
            )

    def test_getEventDetails(self):
        """
        Test getEventDetails() method within ticketmaster_api.py with event_id as parameter
        """
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "weather": [{"description": "overcast clouds", "icon": "04d"}],
            "main": {
                "temp": 280.52,
                "feels_like": 279.75,
                "temp_min": 278.3,
                "temp_max": 282.47,
                "humidity": 89,
            },
            "wind": {
                "speed": 1.54,
            },
        }
        with patch("openweathermap_api.requests.get") as mock_requests_get:
            mock_requests_get.return_value = mock_response
            self.assertEqual(
                getWeather("-51.5085", "-0.1257"),
                {
                    "temperature_f": 45.27,
                    "temperature_min_f": 41.27,
                    "temperature_max_f": 48.78,
                    "temperature_c": 7.37,
                    "temperature_min_c": 5.15,
                    "temperature_max_c": 9.32,
                    "weather_icon": "04d",
                    "weather_description": "overcast clouds",
                    "humidity": 89,
                    "wind": 1.54,
                },
            )

    def test_search(self):
        """
        Test search() method within ticketmaster_api.py with zipcode as parameter
        """
        mock_response = MagicMock()
        mock_response.json.return_value = {"page": {"totalElements": 0}}

        with patch("ticketmaster_api.requests.get") as mock_requests_get:
            mock_requests_get.return_value = mock_response

            self.assertEqual(search("12345"), False)


class OpenWeatherMapUnmockedTest(unittest.TestCase):
    """
    This class is for unmocked testing
    """

    def test_openWeatherMapTest1(self):
        test1 = "123.4"
        test2 = "-35.8"
        expected_output = [123.4, -35.8]
        actual_output = openWeatherMapTest1(test1, test2)
        self.assertEqual(expected_output, actual_output)

    def test_openWeatherMapTest2(self):
        test = 300
        expected_output = -0.67
        actual_output = openWeatherMapTest2(test)
        self.assertLess(expected_output, actual_output)

    def test_openWeatherMapTest3(self):
        test = 250
        expected_output = 0
        actual_output = openWeatherMapTest3(test)
        self.assertGreater(expected_output, actual_output)


if __name__ == "__main__":
    unittest.main()
