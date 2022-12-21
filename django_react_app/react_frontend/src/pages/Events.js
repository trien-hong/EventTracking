import { useState, useEffect, useContext } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddEventButton from '../components/AddEventButton';
import UserAuthContext from '../contexts/UserAuthContext';

function Events() {
    const [events, setEvents] = useState([""]);
    const {userInfo} = useContext(UserAuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        getEvents();
    }, []);

    async function getEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${userInfo.zip_code}/`);
        const response = await fetch(`http://127.0.0.1/api/events/search/input/${userInfo.zip_code}/`);
        const data = await response.json()
        setEvents(data)
    }

    function goToEventDetails(event_id) {
        navigate(`/events/id/details/${event_id}/`);
    }

    return (
        <div className="events">
            {events.map((event, i) =>
                <div className={event.event_id} id="event_border" key={i}>
                    <center>
                        <br></br>
                        <Typography><b>{event.title}</b></Typography>
                        <br></br>
                        <Typography>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                        <br></br>
                        <img src={event.imageUrl} alt="image not found" width={225} height={126} onClick={() => { goToEventDetails(event.event_id); }}/>
                        <br></br>
                        <br></br>
                        <Typography>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                        <br></br>
                        <AddEventButton event={event}/>
                        <br></br>
                        <br></br>
                    </center>
                </div>
            )}
        </div>
    );
}

export default Events;