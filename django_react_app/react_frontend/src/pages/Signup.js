import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import MapIcon from '@mui/icons-material/Map';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function Signup() {
    const [messages, setMessages] = useState([null]);
    const [textfieldType, setTextfieldType] = useState("password");
    const [tooltipText, setTooltipText] = useState("Show Password");
    const [icon, setIcon] = useState(<VisibilityIcon/>);
    
    useEffect(() => {
        document.title = "Signup";
    }, []);

    async function signup(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/signup_user/`, {
        const response = await fetch(`http://127.0.0.1/api/signup_user/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value,
                "confirm_password": e.target.confirm_password.value,
                "zip_code": e.target.zip_code.value
            })
        });
        const data = await response.json();
        if (data !== true) {
            setMessages(
                <div id="errors">
                    ERROR(S):
                    {data.map((error, i) =>
                        <div key={i}>
                            <p>{error}</p>
                        </div>
                    )}
                    <hr></hr>
                </div>
            );
        } else {
            alert("Account has been created!\n\nYou can now login.");
            setMessages(
                <div id="success">
                    Account has been created! You can now login.
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
                <form id="loginSignupForm" onSubmit={signup}>
                    <Typography sx={{ mb: 1 }} variant="h5">{messages}</Typography>
                    <Typography sx={{ mb: 3 }} variant="h4"><u><b>SIGNUP</b></u></Typography>
                    <PersonIcon2 sx={{ mr: 2, mt: 2, color: "#077E1E"}} id="icons"/><TextField sx={{ background: "white", width: 375 }} type="text" label="Enter username" name="username" variant="filled" inputProps={{ maxLength: 150 }} required/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Enter password" name="password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Confirm password" name="confirm_password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <MapIcon sx={{ mr: 2, mt: 2.3, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type="text" name="zip_code" label="Enter ZIP Code" variant="filled" inputProps={{ minLength:5, maxLength: 5 }} required/>
                    <br></br>
                    <Button sx={{ my: 3 }} type="submit" variant="contained">SUBMIT<AssignmentIndIcon sx={{ ml: 1 }}/></Button>
                    <hr></hr>
                    <Typography sx={{ mt: 2, mb: 1 }} variant="h6">Already have an account? <Typography variant="h6" component={Link} to="/login"><b>Login here</b></Typography></Typography>
                </form>
            </center>
        </div>
    );
}

export default Signup;