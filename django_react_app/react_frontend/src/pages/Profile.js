import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Box, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UserAuthContext from '../contexts/UserAuthContext';
import DeleteEventButton from '../components/DeleteEventButton';
import Loading from '../components/Loading';

function Profile() {
    const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
    }

    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    function scrollUp() {
        window.scrollTo(0, 0);
    }

    function scrollDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <div>
            <center>
                <Typography sx={{ my: 1.75 }} variant="h4">Welcome, {user.username}!</Typography>
            </center>
            {isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {profileEvents ? (
                        <div>
                            <div id="profile">
                                {profileEvents.map((event, i) =>
                                    <div id="eventBorder" className={event.event_id} key={i}>
                                        <center>
                                            <Typography sx={{ mt: 2.5 }}><b><i>{event.title}</i></b></Typography>
                                            <Typography sx={{ my: 2.5 }}>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                            <img src={event.imageUrl} alt="not found" onClick={() => { goToEventDetails(event.event_id); }}/>
                                            <Typography sx={{ my: 2.5 }}>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                                            <DeleteEventButton event={event} setProfileEvents={setProfileEvents}/>
                                        </center>
                                        <div id="map"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Typography id="errors" variant="h5" align="center">Your profile does not contain any events. Try adding some events in.</Typography>
                        </div>
                    )}
                </div>
            )}
            <br></br>
            <br></br>
            <br></br>
            <AppBar position="static" sx={{ position: "fixed", bottom: 0, color: "black", background: "lightgray" }}>
                <Toolbar style={{ pt: 3, minHeight: 40 }}>
                    <Box sx={{ margin: "auto", display:"flex", alignItems:"center" }}>
                        <Tooltip title="Scroll to Top">
                            <ArrowUpwardIcon sx={{ mr: 1, background: "white" }} id="scrollUp" onClick={() => { scrollUp(); }}/>
                        </Tooltip>
                        <Tooltip title="Scroll to Bottom">
                            <ArrowDownwardIcon sx={{ background: "white" }} id="scrollDown" onClick={() => { scrollDown(); }}/>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Profile;