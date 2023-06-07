from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(["GET"])
def getRoutes(request):
    """
    Endpoints: /api/ or ""
    """
    routes = [
        {
            'Endpoint': '/api/signup/',
            'Method': ['POST'],
            'Restricted': False,
            'Description': {
                'POST': 'Signup a user and save their information inside the database'
            }
        },
        {
            'Endpoint': '/api/events/page/<str:page>/size/<str:size>/sort/<str:sort>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns an array of events based on the current logged in user zip code, size, page, & sort'
            }
        },
        {
            'Endpoint': '/api/events/search/input/<str:input>/page/<str:page>/size/<str:size>/sort/<str:sort>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns an array of events based on the search input, size, page, & sort'
            }
        },
        {
            'Endpoint': '/api/events/details/id/<str:id>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns a single event with even more details about it'
            }
        },
        {
            'Endpoint': '/api/events/weather/latitude/<str:latitude>/longitude/<str:longitude>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns a dictionary of weather details for events'
            }
        },
        {
            'Endpoint': '/api/user/reviews/',
            'Method': ['POST', 'PUT', 'DELETE'],
            'Restricted': True,
            'Description': {
                'POST': 'Saves reviews left by the user to the database',
                'PUT': 'Updates the specific review left by a user',
                'DELETE': 'Deletes the specific review left by the user'
            }
        },
        {
            'Endpoint': '/api/user/replies/',
            'Method': ['POST', 'PUT', 'DELETE'],
            'Restricted': True,
            'Description': {
                'POST': 'Saves replies left by the user to the database',
                'PUT': 'Updates the specific reply left by a user',
                'DELETE': 'Deletes the specific reply left by the user'
            }
        },
        {
            'Endpoint': '/api/reviews/get/event_id/<str:event_id>/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns all reviews left by all users for that specific event'
            }
        },
        {
            'Endpoint': '/api/profile/events/',
            'Method': ['GET', 'POST', 'DELETE'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns all events from which the user have save',
                'POST': 'Saves an event to the user\'s profile',
                'DELETE': 'Deletes an event from the user\'s profile'
            }
        },
        {
            'Endpoint': '/api/profile/reviews/',
            'Method': ['GET'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns an array of reviews from which the user have left'
            }
        },
        {
            'Endpoint': '/api/profile/settings/picture/',
            'Method': ['GET', 'PUT', 'DELETE'],
            'Restricted': True,
            'Description': {
                'GET': 'Returns a location of the user\'s profile picture',
                'PUT': 'Updates the user\'s profile picture',
                'DELETE': 'Deletes the user\'s profile picture'
            }
        },
        {
            'Endpoint': '/api/profile/settings/info/',
            'Method': ['PUT'],
            'Restricted': True,
            'Description': {
                'PUT': 'Updates a user\'s information (username, password, &/or zip_code)'
            }
        },
        {
            'Endpoint': '/api/forgot/password/',
            'Method': ['PUT'],
            'Restricted': False,
            'Description': {
                'PUT': 'Updates a user\'s password in the event that they forget it'
            }
        },
        {
            'Endpoint': '/api/token/',
            'Method': ['POST'],
            'Restricted': None,
            'Description': {
                'POST': 'Used for logging in and generating tokens'
            }
        },
        {
            'Endpoint': '/api/token/refresh/',
            'Method': ['POST'],
            'Restricted': None,
            'Description': {
                'POST': 'Used for generating new access tokens with refresh token'
            }
        }
    ]
    
    return Response(routes, status=status.HTTP_200_OK)