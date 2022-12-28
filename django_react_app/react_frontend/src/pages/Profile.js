import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';
import DeleteEventButton from '../components/DeleteEventButton';

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

    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div>
            <center>
                <br></br>
                <Typography variant="h4">Welcome, {user.username}!</Typography>
            </center>
            {profileEvents ? (
                <div id="events">
                    {profileEvents.map((event, i) =>
                        <div id="eventBorder" className={event.event_id} key={i}>
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
                                <DeleteEventButton event={event} setProfileEvents={setProfileEvents}/>
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