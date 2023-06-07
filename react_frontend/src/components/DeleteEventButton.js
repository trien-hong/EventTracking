import { useContext } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAuthContext from '../contexts/UserAuthContext';

function DeleteEventButton({event, profileEvents, setProfileEvents}) {
    const {authTokens} = useContext(UserAuthContext);

    async function deleteProfileEvent() {
        setProfileEvents((events) => events.filter((profileEvents) => profileEvents !== event));
        if(profileEvents.length - 1 === 0) {
            setProfileEvents(null);
        }
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/events/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/events/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                event_id: event.event_id
            })
        });
        if (response.status === 200) {
            alert("Event titled \"" + event.title + "\" has been deleted from your profile.");
        } else {
            alert("There seems to be an issue in deleting your event from your profile.");
        }
    }

    return (
        <div>
            <Button sx={{ mb: 3 }} variant="contained" onClick={() => { deleteProfileEvent(); }}><DeleteIcon sx={{ mr: 1 }}/>DELETE EVENT</Button>
        </div>
    );
}

export default DeleteEventButton;