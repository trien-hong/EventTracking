# pylint: disable=C0301, C0103

"""
SWE Final Project | Event Tracking
"""

from cgi import test
import unittest
from unittest.mock import MagicMock, patch
from ticketmaster_api import getEvents, getEventDetails, search
from openweathermap_api import openWeatherMapTest1, openWeatherMapTest2, openWeatherMapTest3


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
                        "dates": {
                            "start": {
                                "localDate": "2022-10-10"
                            }
                        },
                        "_embedded": {
                            "venues": [{
                                "city": {
                                    "name": "Hollywood"
                                },
                                "state": {
                                    "stateCode": "CA"
                                },
                            }]
                        },
                    }
                ],
            },
            "page": {
                "totalElements": 800,
            }
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
                    ], ["2022-10-10"], ["Hollywood"], ["CA"], ["TBD"], ["TBD"]
                ),
            )

    def test_getEventDetails(self):
        """
        Test getEventDetails() method within ticketmaster_api.py with event_id as parameter
        """
        mock_response = MagicMock()
        mock_response.json.return_value = {
            "name": "BTS PERMISSION TO DANCE ON STAGE - LIVE PLAY in Las Vegas",
            "images": [
                {
                    "url": "https://s1.ticketm.net/dam/a/987/77659b74-aaf7-4587-918d-f692669ac987_1619751_TABLET_LANDSCAPE_LARGE_16_9.jpg"
                }
            ],
            "dates": {
                "start": {
                    "localDate": "2022-04-08",
                }
            },
            "classifications": [
                {
                    "genre": {
                        "name": "Other",
                    }
                }
            ],
            "_embedded": {
                "venues": [
                    {
                        "name": "MGM Grand Garden Arena",
                        "postalCode": "89109",
                        "city": {"name": "Las Vegas"},
                        "state": {"name": "Nevada"},
                        "address": {"line1": "3799 Las Vegas Blvd S"},
                        "location": {
                            "longitude": "-115.145103",
                            "latitude": "36.124401",
                        },
                    }
                ]
            },
        }

        with patch("ticketmaster_api.requests.get") as mock_requests_get:
            mock_requests_get.return_value = mock_response

            self.assertEqual(
                getEventDetails("Z7r9jZ1Ad8eq4"),
                {
                    "name": "BTS PERMISSION TO DANCE ON STAGE - LIVE PLAY in Las Vegas",
                    "eventImageURL": "https://s1.ticketm.net/dam/a/987/77659b74-aaf7-4587-918d-f692669ac987_1619751_TABLET_LANDSCAPE_LARGE_16_9.jpg",
                    "startDate": "2022-04-08",
                    "genre": "Other",
                    "minPrice": "TBD",
                    "maxPrice": "TBD",
                    "venue": "MGM Grand Garden Arena",
                    "address": "3799 Las Vegas Blvd S"
                    + ", "
                    + "Las Vegas"
                    + ", "
                    + "Nevada"
                    + " "
                    + "89109",
                    "longitude": "-115.145103",
                    "latitude": "36.124401",
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
