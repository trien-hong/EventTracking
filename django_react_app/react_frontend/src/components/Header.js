import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserAuthContext from '../contexts/UserAuthContext';

function Header() {
    const {user, logout, clearLoginMessage} = useContext(UserAuthContext);

    const navigate = useNavigate();

    function search(e) {
        e.preventDefault();
        navigate({ pathname: `/search`, search: `?q=${e.target.searchBar.value}` });
    }

    return (
        <AppBar position="static" sx={{ background: "gray" }}>
            <Toolbar>
                {user ? (
                    <>
                        <Box sx={{ flexGrow: 1}}>
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/events">EVENTS</Button>
                        </Box>
                        <Box sx={{ flexGrow: .72 }}>
                            <form onSubmit={search}>
                                <TextField sx={{ background: "white", width: 375, mr: 1 }} InputLabelProps={{ required: false }} label="Search events here..." name="searchBar" variant="filled" required/>
                                <Button sx={{ mt: 1.1 }} type="submit" variant="contained"><SearchIcon/></Button>
                            </form>
                        </Box>
                        <Box sx={{ margin: "auto" }}>
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/profile">PROFILE</Button>
                            <Button variant="contained" onClick={() => { logout(); }}>LOGOUT</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box sx={{ margin: "auto" }}>
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/signup" onClick={() => { clearLoginMessage(); }}>SIGNUP</Button>
                            <Button sx={{ ml: 1 }} variant="contained" component={Link} to="/login">LOGIN</Button>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;