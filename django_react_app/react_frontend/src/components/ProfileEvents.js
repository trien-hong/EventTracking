import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import UserAuthContext from '../contexts/UserAuthContext';
import DeleteEventButton from '../components/DeleteEventButton';
import Loading from '../components/Loading';

function ProfileEvents() {
    const [isLoading, setIsLoading] = useState(true);
    const [profileEvents, setProfileEvents] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Profile Events | ${user.username}`;
        getProfileEvents();
    }, []);

    async function getProfileEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/events/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/events/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            setProfileEvents(data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div id="profileEvents">
            { isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {profileEvents ? (
                        <div id="profileEventsContainer">
                            {profileEvents.map((event, i) =>
                                <div id="eventBorder" key={i}>
                                    <Grid textAlign="center">
                                        <Typography sx={{ mt: 2.5 }} variant="body1"><b><i>{event.title}</i></b></Typography>
                                        <Typography sx={{ my: 2.5 }} variant="body1">{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                        <img src={event.imageUrl} alt="not found" onClick={() => { goToEventDetails(event.event_id); }}/>
                                        <Typography sx={{ my: 2.5 }} variant="body1">{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                                        <DeleteEventButton event={event} profileEvents={profileEvents} setProfileEvents={setProfileEvents}/>
                                    </Grid>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div id="generalContainer">
                            <Typography id="errors" variant="h5" align="center">Your profile does not contain any events.<br></br>Try saving some events in.</Typography>
                            <Divider sx={{ my: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="error" label="ERROR" icon={ <ErrorIcon/> }/></Divider>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileEvents;