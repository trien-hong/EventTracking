import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import SaveEventButton from '../components/SaveEventButton';
import EventsDisplayOptions from '../components/EventsDisplayOptions';
import Paging from '../components/Paging';
import Loading from '../components/Loading';

function Events() {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState(null);
    const [eventsPerPage, setEventsPerPage] = useState("12");
    const [zip, setZip] = useState(null);
    const [sortingOptions, setSortingOptions] = useState("name,asc");
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
                            <EventsDisplayOptions setEventsPerPage={setEventsPerPage} eventsPerPage={eventsPerPage} setSortingOptions={setSortingOptions} sortingOptions={sortingOptions}/>
                            <div id="eventsContainer">
                                {events.map((event, i) =>
                                    <div id="eventBorder" key={i}>
                                        <Grid textAlign="center">
                                            <Typography sx={{ mt: 2.5 }} variant="body1"><b><i>{event.title}</i></b></Typography>
                                            <Typography sx={{ my: 2.5 }} variant="body1">{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                            <img src={event.imageUrl} alt="not found" onClick={() => { goToEventDetails(event.event_id); }}/>
                                            <Typography sx={{ my: 2.5 }} variant="body1">{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                                            <SaveEventButton event={event} margin={2.5}/>
                                        </Grid>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Grid sx={{ mt: 2 }} justifyContent="center" textAlign="center">
                                <div id="generalContainer">
                                    {zip ? (
                                        <Typography id="errors" variant="h5" align="center">Your ZIP code of "{zip}" did not have any events.<br></br>Try searching for events instead.</Typography>
                                    ) : (
                                        <Typography id="errors" variant="h5" align="center">Oh no! There's an error in getting your events.<br></br>Try searching for events instead.</Typography>
                                    )}
                                    <Divider sx={{ mt: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="error" label="ERROR" icon={ <ErrorIcon/> }/></Divider>
                                </div>
                            </Grid>
                        </div>
                    )}
                </div>
            )}
            <Paging setEvents={setEvents} setIsLoading={setIsLoading} setZip={setZip} eventsPerPage={eventsPerPage} sortingOptions={sortingOptions}/>
        </div>
    );
}

export default Events;