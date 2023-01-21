import { useContext } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAuthContext from '../contexts/UserAuthContext';

function DeleteEventButton({event, setProfileEvents}) {
    const {authTokens} = useContext(UserAuthContext);

    async function getProfileEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/`, {
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
        // await fetch(`http://127.0.0.1:8000/api/profile/`, {
        await fetch(`http://127.0.0.1/api/profile/`, {
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
    }

    return (
        <div>
            <Button sx={{ mb: 3 }} variant="contained" onClick={() => { deleteProfileEvent(); }}>DELETE EVENT<DeleteIcon sx={{ ml: 1 }}/></Button>
        </div>
    );
}

export default DeleteEventButton;