import { useEffect, useState, useContext } from 'react';
import { AppBar, Avatar, Badge, Box, Button, Grid, Toolbar, Tooltip, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';
import ProfileSettings from '../components/ProfileSettings';
import ProfileEvents from '../components/ProfileEvents';
import ProfileReviews from '../components/ProfileReviews';

function Profile() {
    const [isProfilePictureLoaded, setIsProfilePictureLoaded] = useState(false);
    const [display, setDisplay] = useState("");
    const [settingsButtonColor, setSettingsButtonColor] = useState("primary");
    const [eventsButtonColor, setEventsButtonColor] = useState("primary");
    const [reviewsButtonColor, setReviewsButtonColor] = useState("primary");
    const {user} = useContext(UserAuthContext);
    const {profilePictureLocation, deleteProfilePicture} = useContext(ProfilePictureContext);

    useEffect(() => {
        document.title = `Profile | ${user.username}`;
    }, [user]);

    useEffect(() => {
        if (profilePictureLocation !== null) {
            setIsProfilePictureLoaded(true);
        } else {
            setIsProfilePictureLoaded(false);
        }
    }, [profilePictureLocation]);

    function scrollUp() {
        window.scrollTo({top: 0, behavior: "smooth" });
    }

    function scrollDown() {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth" });
    }

    function displayProfileSettings() {
        if (settingsButtonColor === "success") {
            setDisplay(null);
            setSettingsButtonColor("primary");
        } else {
            setSettingsButtonColor("success");
            setEventsButtonColor("primary");
            setReviewsButtonColor("primary");
            setDisplay(
                <ProfileSettings/>
            );
        }
    }

    function displayProfileEvents() {
        if (eventsButtonColor === "success") {
            setDisplay(null);
            setEventsButtonColor("primary");
        } else {
            setSettingsButtonColor("primary");
            setEventsButtonColor("success");
            setReviewsButtonColor("primary");
            setDisplay(
                <ProfileEvents/>
            );
        }
    }

    function displayProfileReviews() {
        if (reviewsButtonColor === "success") {
            setDisplay(null);
            setReviewsButtonColor("primary");
        } else {
            setSettingsButtonColor("primary");
            setEventsButtonColor("primary");
            setReviewsButtonColor("success");
            setDisplay(
                <ProfileReviews/>
            );
        }
    }

    return (
        <div id="profile">
            <Grid textAlign="center">
                <Typography sx={{ my: 2 }} variant="h4">Welcome, {user.username}!</Typography>
                { isProfilePictureLoaded ? (
                    <Grid sx={{ display: "flex", justifyContent: "center" }}>
                        <Badge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} badgeContent={<Tooltip title="Delete Profile Picture"><DeleteIcon sx={{ mt: 3 }} id="profilePictureDelete" onClick={() => { deleteProfilePicture(); }}/></Tooltip>}>
                            <Avatar sx={{ height: "175px", width: "175px", borderStyle: "solid", borderColor: "gray", borderWidth: "5px" }} src={"http://localhost:8000" + profilePictureLocation} alt={user.username}/>
                        </Badge>
                    </Grid>
                ) : (
                    <Grid sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar sx={{ height: "175px", width: "175px", borderStyle: "solid", borderColor: "gray", borderWidth: "5px" }}>{user.username.charAt(0)}</Avatar>
                    </Grid>
                )}
                <Button sx={{ my: 3 }} color={settingsButtonColor} variant="contained" onClick={() => { displayProfileSettings(); }}><SettingsIcon sx={{ mr: 1 }}/>Profile Settings</Button>
                <Button sx={{ my: 3, mx: 1.5 }} color={eventsButtonColor} variant="contained" onClick={() => { displayProfileEvents(); }}><AssignmentIcon sx={{ mr: 1 }}/>Profile Events</Button>
                <Button sx={{ my: 3 }} color={reviewsButtonColor} variant="contained" onClick={() => { displayProfileReviews(); }}><ReviewsIcon sx={{ mr: 1 }}/>Profile Reviews</Button>
                {display}
                <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0, color: "black", background: "lightgray" }}>
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
            </Grid>
        </div>
    );
}

export default Profile;