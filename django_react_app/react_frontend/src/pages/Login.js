import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UserAuthContext from '../contexts/UserAuthContext';

function Login() {
    const [textfieldType, setTextfieldType] = useState("password");
    const [tooltipText, setTooltipText] = useState("Show Password");
    const [icon, setIcon] = useState(<VisibilityIcon/>);
    const {login, message} = useContext(UserAuthContext);

    useEffect(() => {
        document.title = "Event Tracking | Login";
    }, []);

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
                <form id="loginSignupForm" onSubmit={login}>
                    <Typography sx={{ mb: 1 }} variant="h5">{message}</Typography>
                    <Typography sx={{ mb: 3 }} variant="h4"><u><b>LOGIN</b></u></Typography>
                    <PersonIcon2 sx={{ mr: 2, mt: 2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375 }} type="text" label="Enter username" name="username" variant="filled" required/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Enter password" name="password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                    <br></br>
                    <Button sx={{ my: 3 }} type="submit" variant="contained">SUBMIT<LockOpenIcon sx={{ ml: 1 }}/></Button>
                    <hr></hr>
                    <Typography sx={{ mt: 2, mb: 1 }} variant="h6">Don't have an account? <Typography variant="h6" component={Link} to="/signup"><b>Signup here</b></Typography></Typography>
                </form>
            </center>
        </div>
    );
}

export default Login;