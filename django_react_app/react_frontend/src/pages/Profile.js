import { useEffect, useState, useContext } from 'react';
import { AppBar, Avatar, Box, Button, Toolbar, Tooltip, Typography, } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReviewsIcon from '@mui/icons-material/Reviews';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';
import ProfileSettings from '../components/ProfileSettings';
import ProfileEvents from '../components/ProfileEvents';
import ProfileReviews from '../components/ProfileReviews';

function Profile() {
    const [isProfilePictureLoaded, setIsProfilePictureLoaded] = useState(false);
    const [display, setDisplay] = useState("");
    const {user} = useContext(UserAuthContext);
    const {profilePictureLocation} = useContext(ProfilePictureContext);

    useEffect(() => {
        document.title = `Profile | ${user.username}`;
    }, []);

    useEffect(() => {
        if (profilePictureLocation !== null) {
            setIsProfilePictureLoaded(true);
        }
    }, [profilePictureLocation]);

    function scrollUp() {
        window.scrollTo({top: 0, behavior: "smooth" });
    }

    function scrollDown() {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth" });
    }

    function displayProfileSettings() {
        setDisplay(
            <ProfileSettings/>
        );
    }

    function displayProfileEvents() {
        setDisplay(
            <ProfileEvents/>
        );
    }

    function displayProfileReviews() {
        setDisplay(
            <ProfileReviews/>
        );
    }

    return (
        <div>
            <center>
                <Typography sx={{ my: 2 }} variant="h4">Welcome, {user.username}!</Typography>
                <div>
                    { isProfilePictureLoaded ? (
                        <div>
                            <Avatar sx={{ ml: 1, mb: 2, height: "175px", width: "175px", borderStyle: "solid", borderColor: "gray", borderWidth: "5px"  }} src={"http://localhost:8000" + profilePictureLocation} alt={user.username}/>
                        </div>
                    ) : (
                        <div>
                            <Avatar sx={{ ml: 1, mb: 2, height: "175px", width: "175px", borderStyle: "solid", borderColor: "gray", borderWidth: "5px"  }}>{user.username.charAt(0)}</Avatar>
                        </div>
                    )}
                </div>
                <Button sx={{ mb: 3 }} variant="contained" onClick={() => { displayProfileSettings(); }}>Profile Settings<SettingsIcon sx={{ ml: 1 }}/></Button>
                <Button sx={{ mb: 3, mx: 1.5 }} variant="contained" onClick={() => { displayProfileEvents(); }}>Profile Events<AssignmentIcon sx={{ ml: 1 }}/></Button>
                <Button sx={{ mb: 3 }} variant="contained" onClick={() => { displayProfileReviews(); }}>Profile Reviews<ReviewsIcon sx={{ ml: 1 }}/></Button>
                {display}
                <AppBar position="static" sx={{ position: "fixed", bottom: 0, color: "black", background: "lightgray" }}>
                    <Toolbar style={{ pt: 3, minHeight: 40 }}>
                        <Box sx={{ margin: "auto", display: "flex", alignItems: "center" }}>
                            <Tooltip title="Scroll to Top">
                                <ArrowUpwardIcon sx={{ mr: 1, background: "white" }} id="scroll" onClick={() => { scrollUp(); }}/>
                            </Tooltip>
                            <Tooltip title="Scroll to Bottom">
                                <ArrowDownwardIcon sx={{ background: "white" }} id="scroll" onClick={() => { scrollDown(); }}/>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </AppBar>
            </center>
        </div>
    );
}

export default Profile;