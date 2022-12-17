import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Search() {
    const [searchEvents, setSearchEvents] = useState([""]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q");
    const navigate = useNavigate();

    useEffect(() => {
        getSearchEvents();
    }, [search]);

    async function getSearchEvents() {
        const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${search}/`);
        const data = await response.json();
        setSearchEvents(data);
    };

    async function addEvent(event_id, title, date, city, imageUrl, minPrice, maxPrice) {
        await fetch(`http://127.0.0.1:8000/api/profile/save/event/id/${event_id}/`, {
        method: "POST",
            body: JSON.stringify({
                event_id: event_id,
                title: title,
                date: date,
                city: city,
                imageUrl: imageUrl,
                minPrice: minPrice,
                maxPrice: maxPrice,
            })
        });
    }

    function goToEventDetails(event_id) {
        navigate(`/eventDetails/id/${event_id}/`);
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
                                <Button variant="contained" id={event.id} onClick={() => { addEvent(event.event_id, event.title, event.date, event.city, event.imageUrl, event.minPrice, event.maxPrice); }}>ADD EVENT</Button>
                                <br></br>
                                <br></br>
                            </center>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <br></br>
                    <Typography id="emptyEvents" variant="h5" align="center">Your search of "{search}" came back empty.</Typography>   
                </div>
            )}
        </div>
    );
}

export default Search;