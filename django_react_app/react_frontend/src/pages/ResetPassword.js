// obviously you shouldn't be able to update a password just because you know a username
// there should be some secondary method of verifiction (such as email)
// i'll find a way to do this later
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UserAuthContext from '../contexts/UserAuthContext';

function ResetPassword() {
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
                    <hr></hr>
                </div>
            );
        } else {
            const data = await response.json();
            alert("There seems to be error(s) in resting your password.");
            setMessages(
                <div id="errors">
                    ERROR(S):
                    {data["non_field_errors"].map(errors => (
                        <div>
                            {Object.entries(errors).map(([key, val]) => {
                            return (
                                <p>
                                    {val}
                                </p>
                            )
                            })}
                        </div>
                    ))}
                    <hr></hr>
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
            <center>
                <br></br>
                <form id="form" onSubmit={resetPassword}>
                    <Typography sx={{ mb: 1 }} variant="h5">{messages}</Typography>
                    <Typography sx={{ mb: 3 }} variant="h4"><u><b>RESET PASSWORD</b></u></Typography>
                    <PersonIcon2 sx={{ mr: 2, mt: 2, color: "#077E1E"}} id="icons"/><TextField sx={{ background: "white", width: 375 }} type="text" label="Enter username" name="username" variant="filled" inputProps={{ maxLength: 150 }} required/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Enter password" name="password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Confirm password" name="confirm_password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <Button sx={{ my: 3 }} type="submit" variant="contained">RESET<RestartAltIcon sx={{ ml: 1 }}/></Button>
                    <hr></hr>
                    <Typography sx={{ mt: 2, mb: 1 }} variant="h6">Don't have an account? <Typography variant="h6" component={Link} to="/signup/"><b>Signup here</b></Typography></Typography>
                    <hr></hr>
                    <Typography sx={{ mt: 2, mb: 1 }} variant="h6">Already have an account? <Typography variant="h6" component={Link} to="/login"><b>Login here</b></Typography></Typography>
                </form>
            </center>
        </div>
    );
}

export default ResetPassword;