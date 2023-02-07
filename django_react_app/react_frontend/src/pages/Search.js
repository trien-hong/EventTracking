import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import SaveEventButton from '../components/SaveEventButton';
import DisplayOptions from '../components/DisplayOptions';
import Paging from '../components/Paging';
import Loading from '../components/Loading';

function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchEvents, setSearchEvents] = useState(null);
    const [searchParams] = useSearchParams();
    const [eventsPerPage, setEventsPerPage] = useState("12");
    const [sortingOptions, setSortingOptions] = useState("name,asc");
    const search = searchParams.get("q");
    const navigate = useNavigate();
    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div id="search">
            {isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {searchEvents ? (
                        <div>
                            <DisplayOptions setEventsPerPage={setEventsPerPage} eventsPerPage={eventsPerPage} setSortingOptions={setSortingOptions} sortingOptions={sortingOptions}/>
                            <div id="eventsContainer">
                                {searchEvents.map((event, i) =>
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
                            <Grid sx={{ mt: 2 }} container justifyContent="center" textAlign="center">
                                <div id="generalContainer">
                                <Typography id="errors" variant="h5" align="center">Sorry, your search of "{search}" came back empty.<br></br>Please try again.</Typography>
                                <Divider sx={{ mt: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="error" label="ERROR" icon={ <ErrorIcon/> }/></Divider>
                                </div>
                            </Grid>
                        </div>
                    )}
                </div>
            )}
            <Paging setSearchEvents={setSearchEvents} setIsLoading={setIsLoading} eventsPerPage={eventsPerPage} sortingOptions={sortingOptions}/>
        </div>
    );
}

export default Search;