import { useContext, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';
import UserAuthContext from '../contexts/UserAuthContext';

function Header() {
    const {user, logout, clearLoginMessage} = useContext(UserAuthContext);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function goToSearch(event) {
        if(event.key === "Enter") {
            navigate({ pathname: "/search", search: `?q=${search}` });
        }
    }

    return (
        <AppBar position="static" sx={{ background: "gray"}}>
            <Toolbar>
                {user ? (
                    <>
                        <Box sx={{ flexGrow: 1, display:"flex", alignItems:"center" }}>
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/events">EVENTS</Button>
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/profile">PROFILE</Button>
                        </Box>
                        <Box sx={{ flexGrow: 1.4, display:"flex", alignItems:"center" }}>
                            <TextField sx={{ background: "white", width: 375, mr: 1 }} label="Search events here..." variant="filled" onChange={(event) => { setSearch(event.target.value); }} onKeyPress={(event) => { goToSearch(event); }}/>
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to={{ pathname: "/search", search: `?q=${search}` }}>
                                <SearchIcon/>
                            </Button>
                        </Box>
                        <Button variant="contained" onClick={logout}>LOGOUT</Button>
                    </>
                ) : (
                    <>
                        <Box sx={{ margin: "auto" }}>
                            <Button sx={{ mx: 1 }} variant="contained" component={Link} to="/signup" onClick={clearLoginMessage}>SIGNUP</Button>
                            <Button sx={{ mx: 1 }} variant="contained" component={Link} to="/login">LOGIN</Button>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;