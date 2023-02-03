import { useEffect, useState, useContext } from 'react';
import { Button, Input, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import MapIcon from '@mui/icons-material/Map';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function ProfileSettings() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [updateUserInfoMessage, setUpdateUserInfoMessages] = useState(null);
    const [uploadProfilePictureMessage, setUploadProfilePictureMessage] = useState(null);
    const {user, authTokens, setNewToken} = useContext(UserAuthContext);
    const {getProfilePicture} = useContext(ProfilePictureContext);
    const [textfieldType, setTextfieldType] = useState("password");
    const [tooltipText, setTooltipText] = useState("Show Password");
    const [icon, setIcon] = useState(<VisibilityIcon/>);
    
    useEffect(() => {
        document.title = `Profile Settings | ${user.username}`;
    }, [user])
    
    async function uploadProfilePicture(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", profilePicture);
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/settings/picture/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/settings/picture/`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: formData
        });
        if (response.status === 200) {
            alert("Profile picture successfully uploaded.");
            setUploadProfilePictureMessage(null);
            getProfilePicture();
        } else {
            const data = await response.json();
            alert("Sorry, the file doesn't seem to be a valid image and or file size is greater than 5MB.");
            setUploadProfilePictureMessage(
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

    async function updateUserInfo(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/settings/info/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/settings/info/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value,
                "confirm_password": e.target.confirm_password.value,
                "zip_code": e.target.zip_code.value
            })
        });
        const data = await response.json();
        if (response.status === 200) {
            setNewToken(data);
            setUpdateUserInfoMessages(null);
            alert("Your information has been updated. \n\nAny field(s) left empty will not be reflected.");
        } else {
            alert("There seems to be error(s) in updating your new information on your account");
            setUpdateUserInfoMessages(
                <div id="errors">
                    ERROR(S):
                    {data["non_field_errors"].map((errors, i) => (
                        <div key={i}>
                            {Object.entries(errors).map(([key, val]) => {
                            return (
                                <Typography variant="h5" key={key}>
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

    function showPassword() {
        if (textfieldType === "password") {
            setIcon(<VisibilityOffIcon/>);
            setTextfieldType("text");
            setTooltipText("Hide Password");
        } else {
            setIcon(<VisibilityIcon/>);
            setTextfieldType("password");
            setTooltipText("Show Password");            
        }
    }

    return (
        <div>
            <div id="form">
                <center>
                    <Typography sx={{ mb: 3 }} variant="h4"><u><b>Update Your Info</b></u></Typography>
                    <hr></hr>
                    <form onSubmit={updateUserInfo}>
                        <Typography sx={{ mt: 2 }} variant="h5">{updateUserInfoMessage}</Typography>
                        <PersonIcon2 sx={{ mr: 2, mt: 5, color: "#077E1E"}} id="icons"/><TextField sx={{ mt: 2, background: "white", width: 375 }} type="text" label="Enter new username" name="username" variant="filled" inputProps={{ maxLength: 150 }}/>
                        <br></br>
                        <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Enter new password" name="password" variant="filled" InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                        <br></br>
                        <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Confirm new password" name="confirm_password" variant="filled" InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                        <br></br>
                        <MapIcon sx={{ mr: 2, mt: 2.3, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type="text" name="zip_code" label="Enter new ZIP Code" variant="filled" inputProps={{ minLength:5, maxLength: 5 }}/>
                        <br></br>
                        <Button sx={{ my: 3 }} type="submit" variant="contained">UPDATE<AssignmentIndIcon sx={{ ml: 1 }}/></Button>
                    </form>
                    <hr></hr>
                    <Typography sx={{ mt: 2, mb: 1 }} variant="h5">{uploadProfilePictureMessage}</Typography>
                    <form onSubmit={uploadProfilePicture}>
                        <Input sx={{ mt: 1, mb: 1 }} type="file" onChange={(e) => setProfilePicture(e.target.files[0])} inputProps={{ accept: "image/*" }} required></Input>
                        <Button type="submit" variant="contained">UPLOAD PROFILE PICTURE <FileUploadIcon sx={{ ml: 1 }}/></Button>
                    </form>
                </center>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default ProfileSettings;