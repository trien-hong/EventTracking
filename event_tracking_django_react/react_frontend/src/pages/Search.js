import { Button, Typography } from '@mui/material';

function Search(props) {
    const {searchEvents} = props

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

    function sendDataToMainApp(event_id) {
        props.data(event_id);
    }

    return (
        <div className="events">
            {searchEvents.map((event, i) =>
                <div className={event.event_id} id="event_border" key={i}>
                    <center>
                        <br></br>
                        <Typography><b>{event.title}</b></Typography>
                        <br></br>
                        <Typography>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                        <br></br>
                        <img src={event.imageUrl} alt="image not found" width={225} height={126} onClick={() => { sendDataToMainApp(event.event_id); }}/>
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
    );
}

export default Search;