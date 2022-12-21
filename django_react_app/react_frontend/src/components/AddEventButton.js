import { useContext } from 'react';
import { Button } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';

function AddEventButton(props) {
    const {user} = useContext(UserAuthContext);
    const {event} = props;

    async function addEvent() {
        // await fetch(`http://127.0.0.1:8000/api/profile/username/${user.username}/save/event/id/${event.event_id}/`, {
        await fetch(`http://127.0.0.1/api/profile/username/${user.username}/save/event/id/${event.event_id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_id: event.event_id,
                title: event.title,
                date: event.date,
                city: event.city,
                imageUrl: event.imageUrl,
                minPrice: event.minPrice,
                maxPrice: event.maxPrice,
            })
        });
    }

    return (
        <div>
            <Button variant="contained" onClick={() => { addEvent() }}>ADD EVENT</Button>
        </div>
    );
}

export default AddEventButton;