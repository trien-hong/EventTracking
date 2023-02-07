import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Divider, Grid, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserAuthContext from '../contexts/UserAuthContext';
import SaveEventButton from '../components/SaveEventButton';
import EventReviews from '../components/EventReviews';
import Weather from '../components/Weather';
// import Map from '../components/Map';
// If you would like to see Maps you should uncomment the line above this.
// Since there is a quota on free use (before they start charging) I commented this out so it won't load
import Loading from '../components/Loading';

function EventDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [showReviews, setShowReviews] = useState(false);
    const [eventDetails, setEventDetails] = useState([""]);
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
        if (response.status === 200) {
            const data = await response.json();
            setEventDetails(data);
            setIsLoading(false);
        }
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
        <div id="eventDetails">
            <Grid textAlign="center">
                {isLoading ? (
                    <div>
                        <Loading/>
                    </div>
                ) : (
                    <div>
                        {showReviews ? (
                            <div id="eventDetailsContainer">
                                <Typography variant="h5"><Button variant="contained" onClick={() => { goBack(); }}><ArrowBackIcon/></Button>&nbsp; | &nbsp;<b><u>User's Reviews</u></b>&nbsp; | &nbsp;<Button variant="contained" onClick={() => { hide(); }}>Show Event Details</Button></Typography>
                                <EventReviews event={eventDetails}/>
                            </div>
                        ) : (
                            <div id="eventDetailsContainer">
                                <Typography variant="h5"><Button variant="contained" onClick={() => { goBack(); }}><ArrowBackIcon/></Button>&nbsp; | &nbsp;<b><u>Event Details</u></b>&nbsp; | &nbsp;<Button variant="contained" onClick={() => { show(); }}>Show Reviews</Button></Typography>
                                <Typography sx={{ my: 1.5 }} variant="h4"><b><i>{eventDetails.title}</i></b></Typography>
                                <img src={eventDetails.imageUrl} alt="not found"/>
                                <Divider sx={{ my: 2, backgroundColor: "gray" }}/>
                                <Stack sx={{ my: 2}} direction="row" justifyContent="space-evenly" alignItems="center" divider={<Divider sx={{ backgroundColor: "gray" }} orientation="vertical" flexItem/>} spacing={6}>
                                    <Grid>
                                        <Typography variant="h6"><b>Date:</b> {eventDetails.date}</Typography>
                                        <Typography variant="h6"><b>Genre:</b> {eventDetails.genre}</Typography>
                                        <Typography variant="h6"><b>Venue:</b> {eventDetails.venu}</Typography>
                                        <Typography variant="h6"><b>Address:</b> {eventDetails.address}</Typography>
                                        <Typography sx={{ mb: 1 }} variant="h6"><b>Price:</b> {eventDetails.minPrice} &nbsp;-&nbsp; {eventDetails.maxPrice}</Typography>
                                        <SaveEventButton event={eventDetails} margin={0}/>
                                    </Grid>
                                    <Grid>
                                        <Weather latitude={eventDetails.latitude} longitude={eventDetails.longitude}/>
                                    </Grid>
                                </Stack>
                                <Divider sx={{ my: 2, backgroundColor: "gray" }}/>
                                {/* <Map latitude={eventDetails.latitude} longitude={eventDetails.longitude}/> */}
                                {/* If you would like to see Maps you should uncomment the line above this.
                                Since there is a quota on free use (before they start charging) I commented this out so it won't load */}
                            </div>
                        )}
                    </div>
                )}
            </Grid>
        </div>
    );
}

export default EventDetails;