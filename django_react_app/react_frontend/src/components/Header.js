import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Button, Grid, IconButton, InputAdornment, TextField, Toolbar, Tooltip } from '@mui/material';
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
                        <Grid container justifyContent="flex-start">
                            <Button variant="contained" component={Link} to="/events">EVENTS</Button>
                        </Grid>
                        <Grid container justifyContent="center">
                            <form onSubmit={search}>
                                <TextField sx={{ background: "white", width: 375 }} label="Search events here..." name="searchBar" variant="filled" required InputLabelProps={{ required: false }} InputProps={{endAdornment: (<InputAdornment position="end"><Tooltip title="Search"><IconButton type="submit"><SearchIcon sx={{ color: "black" }}/></IconButton></Tooltip></InputAdornment>)}}/>
                            </form>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/profile">PROFILE</Button>
                            <Button variant="contained" onClick={() => { logout(); }}>LOGOUT</Button>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid container justifyContent="center">
                            <Button sx={{ mr: 1 }} variant="contained" component={Link} to="/signup" onClick={() => { clearLoginMessage(); }}>SIGNUP</Button>
                            <Button sx={{ ml: 1 }} variant="contained" component={Link} to="/login">LOGIN</Button>
                        </Grid>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;