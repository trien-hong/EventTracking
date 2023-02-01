import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import UserAuthContext from '../contexts/UserAuthContext';
import SaveEventButton from '../components/SaveEventButton';
import Paging from '../components/Paging';
import Loading from '../components/Loading';

function Events() {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState(null);
    const {user} = useContext(UserAuthContext);
    const navigate = useNavigate();
    
    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div>
            {isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {events ? (
                        <div id="content">
                            <div id="events">
                                {events.map((event, i) =>
                                    <div id="eventBorder" key={i}>
                                        <center>
                                            <Typography sx={{ mt: 2.5 }}><b><i>{event.title}</i></b></Typography>
                                            <Typography sx={{ my: 2.5 }}>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                            <img src={event.imageUrl} alt="not found" onClick={() => { goToEventDetails(event.event_id); }}/>
                                            <Typography sx={{ my: 2.5 }}>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                                            <SaveEventButton event={event} margin={2.5}/>
                                        </center>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <center>
                                <ErrorOutlineIcon sx={{ mt: 5, mb: 5 }} id="errorIcon"/>
                            </center>
                            <Typography id="errors" variant="h5" align="center">Your ZIP code of "{user.zip_code}" did not have any events. <br></br> Try Searching for events instead.</Typography>
                        </div>
                    )}
                </div>
            )}
            <br></br>
            <br></br>
            <Paging setEvents={setEvents} setIsLoading={setIsLoading}/>
        </div>
    );
}

export default Events;