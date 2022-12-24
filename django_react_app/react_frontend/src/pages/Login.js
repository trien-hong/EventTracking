import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import PersonIcon2 from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UserAuthContext from '../contexts/UserAuthContext';

function Login() {
    const {login, message} = useContext(UserAuthContext);
    const [textfieldType, setTextfieldType] = useState("password");
    const [icon, setIcon] = useState(<VisibilityIcon/>);

    useEffect(() => {
        document.title = "Login"
    }, []);

    function showPassword() {
        if (textfieldType === "password") {
            setTextfieldType("text");
        } else {
            setTextfieldType("password");
        }

        if (textfieldType === "password") {
            setIcon(<VisibilityOffIcon/>);
        } else {
            setIcon(<VisibilityIcon/>);
        }
    }

    return (
        <div>
            <center>
                <br></br>
                <form className="login_signup_form" onSubmit={login}>
                    <Typography sx={{ mb: 1 }}variant="h5">{message}</Typography>
                    <Typography variant="h4"><u><b>LOGIN</b></u></Typography>
                    <br></br>
                    <PersonIcon2 sx={{ mr: 2, mt: 2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375 }} type="text" label="Enter username" name="username" variant="filled" required/>
                    <br></br>
                    <PasswordIcon sx={{ mr: 2, mt: 2.2, color: "#077E1E" }} id="icons"/><TextField sx={{ background: "white", width: 375, mt: 0.5 }} type={textfieldType} label="Enter password" name="password" variant="filled" required InputProps={{endAdornment: (<InputAdornment position="end"><IconButton onClick={() => showPassword()}>{icon}</IconButton></InputAdornment>)}}/>
                    <br></br>
                    <br></br>
                    <Button type="submit" variant="contained">SUBMIT<LockOpenIcon sx={{ ml: 1 }}/></Button>
                    <br></br>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <Typography variant="h6">Don't have an account? <Typography variant="h6" component={Link} to="/signup"><b>Signup here</b></Typography></Typography>
                </form>
            </center>
        </div>
    );
}

export default Login;