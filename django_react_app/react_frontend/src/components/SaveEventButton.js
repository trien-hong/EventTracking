import { useContext } from 'react';
import { Button } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';

function SaveEventButton({event, margin}) {
    const {authTokens} = useContext(UserAuthContext);

    async function saveEvent() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                event_id: event.event_id,
                title: event.title,
                date: event.date,
                city: event.city,
                imageUrl: event.imageUrl,
                minPrice: event.minPrice,
                maxPrice: event.maxPrice
            })
        });
        const data = await response.json();
        if (data === true) {
            alert("Event titled \"" + event.title + "\" has been added to your profile.");
        } else {
            alert("You already have this event in your profile.");
        }
    }

    return (
        <div>
            <Button sx={{ mb: margin }} variant="contained" onClick={() => { saveEvent(); }}>SAVE EVENT</Button>
        </div>
    );
}

export default SaveEventButton;