import { useState, useEffect } from "react";
import { Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AddEventButton from '../components/AddEventButton';

function EventDetails() {
    const [eventDetails, setEventDetails] = useState([""]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getEventDetails();
    }, []);

    async function getEventDetails() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/id/${id}/`);
        const response = await fetch(`http://127.0.0.1/api/events/id/${id}/`);
        const data = await response.json();
        console.log(data);
        setEventDetails(data);
    }
    
    function goBack() {
        navigate(-1);
    }

    return (
        <div>
            <br></br>
            <center>
                <div className={eventDetails.event_id} id="event_border">
                    <Typography variant="h5"><Button id="backArrow" variant="contained" onClick={() => { goBack(); }}><ArrowBackIcon/></Button> | <b><u>Event Details</u></b></Typography>
                    <br></br>
                    <Typography variant="h5"><b>{eventDetails.title}</b></Typography>
                    <br></br>
                    <img src={eventDetails.imageUrl} alt="image not found" width={700} height={393}/>
                    <br></br>
                    <br></br>
                    <Typography variant="h6"><b>Date:</b> {eventDetails.date}</Typography>
                    <Typography variant="h6"><b>Genre:</b> {eventDetails.genre}</Typography>
                    <Typography variant="h6"><b>Venu:</b> {eventDetails.venu}</Typography>
                    <Typography variant="h6"><b>Address:</b> {eventDetails.address}</Typography>
                    <Typography variant="h6"><b>Price:</b> {eventDetails.minPrice} &nbsp;-&nbsp; {eventDetails.maxPrice}</Typography>
                    <br></br>
                    <AddEventButton event={eventDetails}/>
                </div>
            </center>
            <br></br>
        </div>
    );
}

export default EventDetails;