import { useEffect, useState, useContext } from 'react';
import { Button, Input, Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';

function ProfileSettings() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [message, setMessage] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);
    const {getProfilePicture} = useContext(ProfilePictureContext);
    
    useEffect(() => {
        document.title = `Profile Settings | ${user.username}`;
    }, [])
    
    async function uploadProfilePicture(e) {
        e.preventDefault();
        if(profilePicture.size / 1024 > 5120) {
            alert("File size is larger than 5 MB (5120 KB). Please upload a smaller file size.")
            setMessage(
                <Typography id="errors" variant="h5">File size is larger than 5 MB (5120 KB). Please upload a smaller file size.</Typography>
            );
        } else {
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
            const data = await response.json();
            if (data === true) {
                alert("Profile picture successfully uploaded. \n\nPage will reload when you click ok.");
                setMessage(null);
                getProfilePicture();
            } else {
                alert("Sorry, the file doesn't seem to be a valid image.");
                setMessage(
                    <Typography id="errors" variant="h5">Sorry, the file doesn't seem to be a valid image.</Typography>
                );
            }
        }
    }

    return (
        <div>
            <center>
                <form onSubmit={uploadProfilePicture}>
                    <Input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} inputProps={{ accept: "image/*" }} required></Input>
                    <Button sx={{ mb: 2}} type="submit" variant="contained">UPLOAD PICTURE</Button>
                </form>
                {message}
            </center>
        </div>
    );
}

export default ProfileSettings;