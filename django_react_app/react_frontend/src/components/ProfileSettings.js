import { useEffect, useState, useContext } from 'react';
import { Button, Input, Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';

function ProfileSettings() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [messages, setMessages] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);
    const {getProfilePicture} = useContext(ProfilePictureContext);
    
    useEffect(() => {
        document.title = `Profile Settings | ${user.username}`;
    }, [])
    
    async function uploadProfilePicture(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", profilePicture);
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/picture/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/picture/`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: formData
        });
        if (response.status === 200) {
            alert("Profile picture successfully uploaded.");
            setMessages(null);
            getProfilePicture();
        } else {
            const data = await response.json();
            alert("Sorry, the file doesn't seem to be a valid image and or file size is greater than 5MB.");
            setMessages(
                <div id="errors">
                    <Typography id="errors" variant="h5">ERROR(S):</Typography>
                    {data["non_field_errors"].map(errors => (
                        <div>
                            {Object.entries(errors).map(([key, val]) => {
                            return (
                                <Typography id="errors" variant="h5">
                                    {val}
                                </Typography>
                            )
                            })}
                        </div>
                    ))}
                </div>
            );
        }
    }

    return (
        <div>
            <center>
                <form onSubmit={uploadProfilePicture}>
                    <Input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} inputProps={{ accept: "image/*" }} required></Input>
                    <Button sx={{ mb: 2}} type="submit" variant="contained">UPLOAD PICTURE</Button>
                </form>
                {messages}
            </center>
        </div>
    );
}

export default ProfileSettings;