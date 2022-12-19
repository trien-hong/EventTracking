import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [profileEvents, setProfileEvents] = useState([""]);
    const navigate = useNavigate();
    
    useEffect(() => {
        getProfileEvents();
    }, []);

    async function getProfileEvents() {
        const response = await fetch("http://127.0.0.1/api/profile/");
        const data = await response.json();
        setProfileEvents(data);
    }

    async function deleteProfileEvent(event_id) {
        await fetch(`http://127.0.0.1/api/profile/delete/event/id/${event_id}/`, {
            method: "DELETE",
            body: JSON.stringify({
                event_id: event_id
            })
        });
        getProfileEvents();
    }

    function goToEventDetails(event_id) {
        navigate(`/eventDetails/id/${event_id}/`);
    }

    return (
        <div>
            {profileEvents ? (
                <div className="events">
                    {profileEvents.map((event, i) =>
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
                                <Button variant="contained" id={event.id} onClick={() => { deleteProfileEvent(event.event_id); }}>DELETE EVENT</Button>
                                <br></br>
                                <br></br>
                            </center>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <br></br>
                    <Typography id="emptyEvents" variant="h5" align="center">You did not add any events to your profile yet.</Typography>
                </div>
            )}
        </div>
    );
}

export default Profile;