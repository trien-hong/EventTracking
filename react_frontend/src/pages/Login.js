import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Divider, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AlertMessage from '../components/AlertMessage';
import UserAuthContext from '../contexts/UserAuthContext';

function Login() {
    const [textfieldType, setTextfieldType] = useState("password");
    const [tooltipText, setTooltipText] = useState("Show Password");
    const [icon, setIcon] = useState(<VisibilityIcon/>);
    const {login, message, openAlert, setOpenAlert} = useContext(UserAuthContext);

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
        <Grid sx={{ mt: 2 }} container justifyContent="center">
            <div id="generalContainer">
                <Collapse in={openAlert}>
                    <AlertMessage setOpenAlert={setOpenAlert} severity="error" alertTitle="ERROR" messages={message}/>
                </Collapse>
                <Grid textAlign="center">
                    <Typography variant="h4"><u><b>LOGIN</b></u></Typography>
                    <form onSubmit={login}>
                        <PersonIcon2 sx={{ mr: 2, mt: 4, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 2, width: 375, background: "white" }} type="text" label="Enter username" name="username" variant="filled" required/>
                        <br></br>
                        <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#CC4D00" }} id="icons"/><TextField sx={{ mt: 0.5, width: 375, background: "white" }} type={textfieldType} label="Enter password" name="password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title={tooltipText}><IconButton onClick={() => { showPassword(); }}>{icon}</IconButton></Tooltip></InputAdornment>)}}/>
                        <br></br>
                        <Button sx={{ my: 2.5 }} type="submit" variant="contained"><LockOpenIcon sx={{ mr: 1 }}/>LOGIN</Button>
                    </form>
                    <Divider sx={{ backgroundColor: "gray" }}/>
                    <Typography sx={{ my: 1 }} variant="h6">Don't have an account? <Typography variant="h6" component={Link} to="/signup/"><b>Signup here</b></Typography></Typography>
                    <Divider sx={{ backgroundColor: "gray" }}/>
                    <Typography sx={{ mt: 1 }} variant="h6">Forgot your password? <Typography variant="h6" component={Link} to="/reset/password/"><b>Reset here</b></Typography></Typography>
                </Grid>
            </div>
        </Grid>
    );
}

export default Login;