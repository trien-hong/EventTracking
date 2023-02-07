import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import UserAuthContext from '../contexts/UserAuthContext';
import SaveEventButton from '../components/SaveEventButton';
import DisplayOptions from '../components/DisplayOptions';
import Paging from '../components/Paging';
import Loading from '../components/Loading';

function Events() {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState(null);
    const [eventsPerPage, setEventsPerPage] = useState("12");
    const [sortingOptions, setSortingOptions] = useState("name,asc");
    const {user} = useContext(UserAuthContext);
    const navigate = useNavigate();
    
    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div id="events">
            {isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {events ? (
                        <div>
                            <DisplayOptions setEventsPerPage={setEventsPerPage} eventsPerPage={eventsPerPage} setSortingOptions={setSortingOptions} sortingOptions={sortingOptions}/>
                            <div id="eventsContainer">
                                {events.map((event, i) =>
                                    <div id="eventBorder" key={i}>
                                        <Grid textAlign="center">
                                            <Typography sx={{ mt: 2.5 }}><b><i>{event.title}</i></b></Typography>
                                            <Typography sx={{ my: 2.5 }}>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                            <img src={event.imageUrl} alt="not found" onClick={() => { goToEventDetails(event.event_id); }}/>
                                            <Typography sx={{ my: 2.5 }}>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                                            <SaveEventButton event={event} margin={2.5}/>
                                        </Grid>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Grid sx={{ mt: 2 }} justifyContent="center" textAlign="center">
                                <div id="container">
                                    <Typography id="errors" variant="h5" align="center">Your ZIP code of "{user.zip_code}" did not have any events.<br></br>Try Searching for events instead.</Typography>
                                    <Divider sx={{ mt: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="error" label="ERROR" icon={ <ErrorIcon/> }/></Divider>
                                </div>
                            </Grid>
                        </div>
                    )}
                </div>
            )}
            <Paging setEvents={setEvents} setIsLoading={setIsLoading} eventsPerPage={eventsPerPage} sortingOptions={sortingOptions}/>
        </div>
    );
}

export default Events;