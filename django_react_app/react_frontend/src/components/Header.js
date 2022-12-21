import { useState } from 'react';
import { AppBar, Toolbar, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function goToSearch(event) {
        if(event.key === "Enter") {
            navigate({ pathname: "/search", search: `?q=${search}` });
        }
    }

    return (
        <div className="header">
            <AppBar position="static" sx={{ background: "gray" }}>
                <Toolbar>
                    <Button sx={{ margin: 'auto' }} variant="contained" component={Link} to="/events">EVENTS</Button>
                    <TextField sx={{ background: "white", width: 375, mr: 1 }} label="Search events here..." variant="filled" onChange={(event) => { setSearch(event.target.value); }} onKeyPress={(event) => { goToSearch(event); }}/>
                    <Button variant="contained" component={Link} to={{ pathname: "/search", search: `?q=${search}` }}>
                        <SearchIcon/>
                    </Button>
                    <Button sx={{ margin: 'auto' }} variant="contained" component={Link} to="/profile">PROFILE</Button>
                    <Button sx={{ margin: 'auto' }} variant="contained" component={Link} to="/signup">SIGNUP</Button>
                    <Button sx={{ margin: 'auto' }} variant="contained" component={Link} to="/login">LOGIN</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;