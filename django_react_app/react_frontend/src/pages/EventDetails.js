import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Stack, Divider, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserAuthContext from '../contexts/UserAuthContext';
import AddEventButton from '../components/AddEventButton';
import UsersReviews from '../components/UsersReviews';
import Weather from '../components/Weather';
import Map from '../components/Map';
import Loading from '../components/Loading';

function EventDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [eventDetails, setEventDetails] = useState([""]);
    const [showReviews, setShowReviews] = useState(false);
    const {authTokens} = useContext(UserAuthContext);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Event Details | ${id}`;
        getEventDetails();
    }, []);

    async function getEventDetails() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/details/id/${id}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/details/id/${id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        const data = await response.json();
        setEventDetails(data);
        setIsLoading(false);
    }
    
    function goBack() {
        navigate(-1);
    }

    function show() {
        setShowReviews(true);
    }

    function hide() {
        setShowReviews(false);
    }

    return (
        <div>
            <br></br>
            <center>
                {isLoading ? (
                    <div>
                        <Loading/>
                    </div>
                ) : (
                    <div>
                        {showReviews ? (
                            <div id="reviewBorder">
                                <Typography variant="h5"><Button variant="contained" onClick={() => { goBack(); }}><ArrowBackIcon/></Button>&nbsp; | &nbsp;<b><u>User's Reviews</u></b>&nbsp; | &nbsp;<Button variant="contained" onClick={() => { hide(); }}>Show Event Details</Button></Typography>
                                <UsersReviews event={eventDetails}/>
                            </div>
                        ) : (
                            <div id="eventDetailsBorder">
                                <Typography variant="h5"><Button variant="contained" onClick={() => { goBack(); }}><ArrowBackIcon/></Button>&nbsp; | &nbsp;<b><u>Event Details</u></b>&nbsp; | &nbsp;<Button variant="contained" onClick={() => { show(); }}>Show Reviews</Button></Typography>
                                <br></br>
                                <Typography variant="h4"><b><i>{eventDetails.title}</i></b></Typography>
                                <br></br>
                                <img src={eventDetails.imageUrl} alt="not found"/>
                                <br></br>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <Stack direction="row" justifyContent="center" divider={<Divider orientation="vertical" flexItem/>} spacing={4}>
                                    <Box>
                                        <Typography variant="h6"><b>Date:</b> {eventDetails.date}</Typography>
                                        <Typography variant="h6"><b>Genre:</b> {eventDetails.genre}</Typography>
                                        <Typography variant="h6"><b>Venue:</b> {eventDetails.venu}</Typography>
                                        <Typography variant="h6"><b>Address:</b> {eventDetails.address}</Typography>
                                        <Typography variant="h6" sx={{ mb: 1 }}><b>Price:</b> {eventDetails.minPrice} &nbsp;-&nbsp; {eventDetails.maxPrice}</Typography>
                                        <AddEventButton event={eventDetails}/>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <center>
                                            <Weather latitude={eventDetails.latitude} longitude={eventDetails.longitude}/>
                                        </center>
                                    </Box>
                                </Stack>
                                <br></br>
                                <hr></hr>
                                <br></br>
                                <Map latitude={eventDetails.latitude} longitude={eventDetails.longitude}/>
                            </div>
                        )}
                    </div>
                )}
            </center>
            <br></br>
        </div>
    );
}

export default EventDetails;