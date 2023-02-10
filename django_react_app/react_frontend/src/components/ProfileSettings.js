import { useEffect, useState, useContext } from 'react';
import { Button, Collapse, Divider, Grid, IconButton, Input, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';
import AlertMessage from '../components/AlertMessage';

function ProfileSettings() {
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("info");
    const [alertTitle, setAlertTitle] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [messages, setMessages] = useState(null);
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
            setMessages(
                <div id="success">
                    Profile picture successfully uploaded.
                </div>
            );
            getProfilePicture();
            setSeverity("success");
            setAlertTitle("SUCCESS");
            setOpenAlert(true);
        } else {
            const data = await response.json();
            alert("Sorry, the file doesn't seem to be a valid image and or file size is greater than 5MB.");
            setMessages(
                <div id="errors">
                    {data["non_field_errors"].map(errors => (
                        <div>
                            {Object.entries(errors).map(([key, val]) => {
                                return (
                                    <div key={key}>
                                        {val}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            );
            setSeverity("error");
            setAlertTitle("ERROR(S)");
            setOpenAlert(true);
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
            alert("Your account information has been updated. \n\nAny field(s) left empty will not be reflected.");
            setMessages(
                <div id="success">
                    Your account information has been updated.<br></br>Any field(s) left empty will not be reflected.
                </div>
            );
            setSeverity("success");
            setAlertTitle("SUCCESS");
            setOpenAlert(true);
        } else {
            alert("There seems to be error(s) in updating your new information on your account");
            setMessages(
                <div id="errors">
                    {data["non_field_errors"].map((errors, i) => (
                        <div key={i}>
                            {Object.entries(errors).map(([key, val]) => {
                                return (
                                    <div key={key}>
                                        {val}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            );
            setSeverity("error");
            setAlertTitle("ERROR(S)");
            setOpenAlert(true);
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
        <div id="profileSettings">
            <div id="generalContainer">
                <Grid textAlign="left">
                    <Collapse in={openAlert}>
                        <AlertMessage setOpenAlert={setOpenAlert} severity={severity} alertTitle={alertTitle} messages={messages}/>
                    </Collapse>
                </Grid>
                <Typography variant="h4"><u><b>Update Your Info</b></u></Typography>
                <Divider sx={{ my: 2, backgroundColor: "gray" }}/>
                <form onSubmit={updateUserInfo}>
                    <PersonIcon2 sx={{ mr: 2, mt: 2.2, color: "#CC4D00"}} id="icons"/><TextField sx={{ background: "white", width: 375 }} type="text" label="Enter new username" name="username" variant="filled" inputProps={{ maxLength: 150 }}/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type={textfieldType} label="Enter new password" name="password" variant="filled" InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type={textfieldType} label="Confirm new password" name="confirm_password" variant="filled" InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <TravelExploreIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type="text" name="zip_code" label="Enter new ZIP Code" variant="filled" inputProps={{ minLength:5, maxLength: 5 }}/>
                    <br></br>
                    <Button sx={{ my: 2 }} type="submit" variant="contained"><AssignmentIndIcon sx={{ mr: 1 }}/>UPDATE</Button>
                </form>
                <Divider sx={{ mb: 2, backgroundColor: "gray" }}/>
                <form onSubmit={uploadProfilePicture}>
                    <Input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} inputProps={{ accept: "image/*" }} required></Input>
                    <Button type="submit" variant="contained"><FileUploadIcon sx={{ mr: 1 }}/>UPLOAD PROFILE PICTURE</Button>
                </form>
            </div>
        </div>
    );
}

export default ProfileSettings;