import { useState } from 'react';
import { AppBar, Toolbar, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
    const [buttonColorEvents, setButtonColorEvents] = useState("primary");
    const [buttonColorProfile, setButtonColorProfile] = useState("primary");
    const [buttonColorSearch, setButtonColorSearch] = useState("primary");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function changeButtonColorEvents() {
        setButtonColorEvents("success");
        setButtonColorProfile("primary");
        setButtonColorSearch("primary");
    }

    function changeButtonColorProfile() {
        setButtonColorEvents("primary");
        setButtonColorProfile("success");
        setButtonColorSearch("primary");
    }

    function changeButtonColorSearch() {
        setButtonColorEvents("primary");
        setButtonColorProfile("primary");
        setButtonColorSearch("success");
    }

    function goToSearch(event) {
        if(event.key === "Enter") {
            changeButtonColorSearch();
            navigate(`/search/input/${search}/`);
        }
    }

    return (
        <div className="header">
            <AppBar position="static" sx={{ background: "gray" }}>
                <Toolbar>
                    <Button sx={{ margin: 'auto' }} color={buttonColorEvents} variant="contained" component={Link} to="/events" onClick={() => { changeButtonColorEvents(); }}>EVENTS</Button>
                    <TextField sx={{ background: "white", width: 375, mr: 1 }} label="Search events here..." variant="filled" onChange={(event) => { setSearch(event.target.value); }} onKeyPress={(event) => { goToSearch(event); }}/>
                    <Button color={buttonColorSearch} variant="contained" component={Link} to={`/search/input/${search}/`} onClick={() => { changeButtonColorSearch(); }}>
                        <SearchIcon/>
                    </Button>
                    <Button sx={{ margin: 'auto' }} color={buttonColorProfile} variant="contained" component={Link} to="/profile" onClick={() => { changeButtonColorProfile(); }}>PROFILE</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;