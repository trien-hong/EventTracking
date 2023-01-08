import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddEventButton from '../components/AddEventButton';
import Paging from '../components/Paging';
import Loading from '../components/Loading';

function Search() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchEvents, setSearchEvents] = useState([""]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q");
    const navigate = useNavigate();
    
    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div>
            {isLoading ? (
                <div>
                    <br></br>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {searchEvents ? (
                        <div id="content">
                            <div id="events">
                                {searchEvents.map((event, i) =>
                                    <div id="eventBorder" key={i}>
                                        <center>
                                            <br></br>
                                            <Typography><b><i>{event.title}</i></b></Typography>
                                            <br></br>
                                            <Typography>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                            <br></br>
                                            <img src={event.imageUrl} alt="not found" onClick={() => { goToEventDetails(event.event_id); }}/>
                                            <br></br>
                                            <br></br>
                                            <Typography>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                                            <br></br>
                                            <AddEventButton event={event}/>
                                            <br></br>
                                        </center>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <center>
                                <ErrorOutlineIcon sx={{ mt: 5, mb: 5 }}id="errorIcon"/>
                            </center>
                            <Typography id="errors" variant="h5" align="center">Sorry, your search of "{search}" came back empty.<br></br>Please try again.</Typography>
                        </div>
                    )}
                </div>
            )}
            <Paging setSearchEvents={setSearchEvents} setIsLoading={setIsLoading}/>
        </div>
    );
}

export default Search;