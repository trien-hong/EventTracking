import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Chip, Divider, IconButton, InputAdornment, TextField, Tooltip, Typography, Grid } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import UserAuthContext from '../contexts/UserAuthContext';

function Signup() {
    const [messages, setMessages] = useState(null);
    const [textfieldType, setTextfieldType] = useState("password");
    const [tooltipText, setTooltipText] = useState("Show Password");
    const [icon, setIcon] = useState(<VisibilityIcon/>);
    const {clearLoginMessage} = useContext(UserAuthContext);
    
    useEffect(() => {
        document.title = "Event Tracking | Signup";
        clearLoginMessage();
    }, []);

    async function signup(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/signup/`, {
        const response = await fetch(`http://127.0.0.1/api/signup/`, {
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
        if (response.status === 201) {
            alert("Account has been created!\n\nYou can now login.");
            setMessages(
                <div id="success">
                    Account has been created! You can now login.
                    <Divider sx={{ my: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="success" label="success" icon={ <CheckIcon/> }/></Divider>
                </div>
            );
        } else {
            const data = await response.json();
            alert("There seems to be error(s) in creating your account");
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
                <Typography variant="h4"><u><b>SIGNUP</b></u></Typography>
                <form onSubmit={signup}>
                    <PersonIcon2 sx={{ mr: 2, mt: 4, color: "#CC4D00"}} id="icons"/><TextField sx={{ mt: 2, width: 375, background: "white" }} type="text" label="Enter username" name="username" variant="filled" inputProps={{ maxLength: 150 }} required/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type={textfieldType} label="Enter password" name="password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type={textfieldType} label="Confirm password" name="confirm_password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <TravelExploreIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type="text" name="zip_code" label="Enter ZIP Code" variant="filled" inputProps={{ minLength:5, maxLength: 5 }} required/>
                    <br></br>
                    <Button sx={{ my: 2.5 }} type="submit" variant="contained">SUBMIT<AssignmentIndIcon sx={{ ml: 1 }}/></Button>
                </form>
                <Divider sx={{ backgroundColor: "gray" }}/>
                <Typography sx={{ my: 1 }} variant="h6">Already have an account? <Typography variant="h6" component={Link} to="/login/"><b>Login here</b></Typography></Typography>
                <Divider sx={{ backgroundColor: "gray" }}/>
                <Typography sx={{ mt: 1 }} variant="h6">Forgot your password? <Typography variant="h6" component={Link} to="/reset/password/"><b>Reset here</b></Typography></Typography>
            </div>
        </Grid>
    );
}

export default Signup;