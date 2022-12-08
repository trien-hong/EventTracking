import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';

function DisplayProfile(props) {
    const [profileEvents, setProfileEvents] = useState([""]);
    
    useEffect(() => {
        getProfileEvents()
    }, []);

    async function getProfileEvents() {
        const response = await fetch("http://127.0.0.1:8000/api/profile/");
        const data = await response.json();
        setProfileEvents(data);
    }

    async function deleteProfileEvent(event_id) {
        await fetch(`http://127.0.0.1:8000/api/profile/delete/event/id/${event_id}/`, {
            method: "DELETE",
            body: JSON.stringify({
                event_id: event_id
            })
        })

        getProfileEvents()
    }

    function sendDataToMainApp(event_id) {
        props.data(event_id);
    };

    return (
        <div className="events">
            {profileEvents.map((event, i) =>
                <div className={event.id} id="event_border" key={i}>
                    <center>
                        <br></br>
                        <Typography><b>{event.title}</b></Typography>
                        <br></br>
                        <Typography>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                        <br></br>
                        <img src={event.imageUrl} alt="image not found" width={225} height={126} onClick={() => { sendDataToMainApp(event.event_id); }}/>
                        <br></br>
                        <br></br>
                        <Typography>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                        <br></br>
                        <Button variant="contained" id={event.id} onClick={() => { deleteProfileEvent(event.event_id); }}>DELETE EVENT</Button>
                        <br></br>
                        <br></br>
                    </center>
                </div>
            )}
        </div>
    )
}

export default DisplayProfile