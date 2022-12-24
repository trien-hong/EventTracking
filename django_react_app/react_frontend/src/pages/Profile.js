import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';

function Profile() {
    const [profileEvents, setProfileEvents] = useState([""]);
    const {user, authTokens} = useContext(UserAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Profile | ${user.username}`;
        getProfileEvents();
    }, []);

    async function getProfileEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/username/${user.username}/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/username/${user.username}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        });
        const data = await response.json();
        setProfileEvents(data);
    }

    async function deleteProfileEvent(event_id) {
        // await fetch(`http://127.0.0.1:8000/api/profile/delete/event/id/`, {
        await fetch(`http://127.0.0.1/api/profile/delete/event/id/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                event_id: event_id
            })
        });
        getProfileEvents();
    }

    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div>
            <center>
                <br></br>
                <Typography sx={{ mb: 1 }} variant="h4">Welcome, {user.username}!</Typography>
            </center>
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
                    <Typography id="errors" variant="h5" align="center">You did not add any events to your profile yet.</Typography>
                </div>
            )}
        </div>
    );
}

export default Profile;