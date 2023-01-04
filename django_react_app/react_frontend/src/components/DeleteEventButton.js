import { useContext } from 'react';
import { Button } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';

function DeleteEventButton({event, setProfileEvents}) {
    const {user, authTokens} = useContext(UserAuthContext);

    async function getProfileEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/username/${user.username}/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/username/${user.username}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        });
        const data = await response.json();
        setProfileEvents(data);
    }

    async function deleteProfileEvent() {
        // await fetch(`http://127.0.0.1:8000/api/profile/delete/event/id/`, {
        await fetch(`http://127.0.0.1/api/profile/delete/event/id/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                event_id: event.event_id
            })
        });
        getProfileEvents();
        alert("Event titled \"" + event.title + "\" has been deleted from your profile.");

        // this doesn't seem to work and i have no idea why
        // if i were to guess it would have to do with objects not being the "same" in js
        // const array = profileEvents;
        // const index = array.indexOf(event);
        // if (index !== -1) {
        //     array.splice(index, 1);
        //     setProfileEvents(array);
        // }
    }

    return (
        <div>
            <Button variant="contained" onClick={() => { deleteProfileEvent(); }}>DELETE EVENT</Button>
        </div>
    );
}

export default DeleteEventButton;