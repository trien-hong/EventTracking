import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Chip, Divider, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import UserAuthContext from '../contexts/UserAuthContext';

function ResetPassword() {
    // obviously you shouldn't be able to update a password just because you know a username
    // there should be some secondary method of verifiction (such as email i'll find a way to do this later)
    // or use email as the verification since that's generally not public or harder to guess/find out
    const [messages, setMessages] = useState(null);
    const [textfieldType, setTextfieldType] = useState("password");
    const [tooltipText, setTooltipText] = useState("Show Password");
    const [icon, setIcon] = useState(<VisibilityIcon/>);
    const {clearLoginMessage} = useContext(UserAuthContext);

    useEffect(() => {
        document.title = "Event Tracking | Reset Password";
        clearLoginMessage();
    }, []);

    async function resetPassword(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/reset/password/`, {
        const response = await fetch(`http://127.0.0.1/api/reset/password/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value,
                "confirm_password": e.target.confirm_password.value,
            })
        });
        if (response.status === 200) {
            alert("You have updated your account password!");
            setMessages(
                <div id="success">
                    You have updated your password on your account! You can now login.
                    <Divider sx={{ my: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="success" label="success" icon={ <CheckIcon/> }/></Divider>
                </div>
            );
        } else {
            const data = await response.json();
            alert("There seems to be error(s) in resting your password.");
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
                    <Divider sx={{ my: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="error" label="ERROR(S)" icon={ <ErrorIcon/> }/></Divider>
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
        <Grid sx={{ mt: 2 }} container justifyContent="center" textAlign="center">
            <div id="generalContainer">
                <Typography variant="h5">{messages}</Typography>
                <Typography variant="h4"><u><b>RESET PASSWORD</b></u></Typography>
                <form onSubmit={resetPassword}>
                    <PersonIcon2 sx={{ mr: 2, mt: 4, color: "#CC4D00"}} id="icons"/><TextField sx={{ mt: 2, width: 375, background: "white" }} type="text" label="Enter username" name="username" variant="filled" inputProps={{ maxLength: 150 }} required/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type={textfieldType} label="Enter new password" name="password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type={textfieldType} label="Confirm new password" name="confirm_password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <Button sx={{ my: 2.5 }} type="submit" variant="contained">RESET<RestartAltIcon sx={{ ml: 1 }}/></Button>
                </form>
                <Divider sx={{ backgroundColor: "gray" }}/>
                <Typography sx={{ my: 1 }} variant="h6">Don't have an account? <Typography variant="h6" component={Link} to="/signup/"><b>Signup here</b></Typography></Typography>
                <Divider sx={{ backgroundColor: "gray" }}/>
                <Typography sx={{ mt: 1 }} variant="h6">Already have an account? <Typography variant="h6" component={Link} to="/login"><b>Login here</b></Typography></Typography>
            </div>
        </Grid>
    );
}

export default ResetPassword;