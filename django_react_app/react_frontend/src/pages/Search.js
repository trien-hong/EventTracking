import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';
import AddEventButton from '../components/AddEventButton';

function Search() {
    const [searchEvents, setSearchEvents] = useState([""]);
    const [searchParams] = useSearchParams();
    const {authTokens} = useContext(UserAuthContext);
    const search = searchParams.get("q");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Search | ${search}`
        getSearchEvents();
    }, [search]);

    async function getSearchEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${search}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/search/input/${search}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        const data = await response.json();
        setSearchEvents(data);
    };

    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div>
            {searchEvents ? (
                <div className="events">
                    {searchEvents.map((event, i) =>
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
                                <AddEventButton event={event}/>
                                <br></br>
                                <br></br>
                            </center>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <br></br>
                    <Typography id="errors" variant="h5" align="center">Your search of "{search}" came back empty.</Typography>
                </div>
            )}
        </div>
    );
}

export default Search;