import { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, Button, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Events from './pages/Events';
import Profile from './pages/Profile';
import EventDetails from './pages/EventDetails';
import Search from './pages/Search';

function App() {
  const [buttonColorEvents, setButtonColorEvents] = useState("primary");
  const [buttonColorProfile, setButtonColorProfile] = useState("primary");
  const [search, setSearch] = useState("");
  const [displayItem, setDisplayItem] = useState("");

  const displayEventDetails = (event_id) => {
    setButtonColorEvents("primary");
    setButtonColorProfile("primary");
    
    setDisplayItem (
      <EventDetails data={event_id}/>
    );
  }

  function displayEvents() {
    if (buttonColorEvents === "primary") {
      setButtonColorEvents("success");
      setButtonColorProfile("primary");

      setDisplayItem (
        <Events data={displayEventDetails}/>
      );
    } else {
      setButtonColorEvents("primary");
      setButtonColorProfile("primary");
      setDisplayItem(null);
    }
  }

  function displayProfile() {
    if (buttonColorProfile === "primary") {
      setButtonColorEvents("primary");
      setButtonColorProfile("success");
      
      setDisplayItem (
        <Profile data={displayEventDetails}/>
      );
    } else {
      setButtonColorEvents("primary");
      setButtonColorProfile("primary");
      setDisplayItem(null);
    }
  }

  async function displaySearch() {
    setButtonColorEvents("primary");
    setButtonColorProfile("primary");
    const data = await getSearchEvents();
    if (data === false) {
      setDisplayItem (
        <div class="emptySearch">
          <br></br>
          <center>
            <Typography variant="h5">Your search "{search}" came up empty. Please try again.</Typography>
          </center>
        </div>
      );
    } else {
      setDisplayItem (
        <Search data={displayEventDetails} searchEvents={data}/>
      );
    }
  }

  async function getSearchEvents() {
    const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${search}/`);
    const data = await response.json();
    return data
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      displaySearch();
    }
  }

  return (
    <div className="App">
      <AppBar position="static" sx={{ background: "gray" }}>
        <Toolbar>
          <Button sx={{ margin: 'auto' }} color={buttonColorEvents} variant="contained" onClick={() => { displayEvents(); }}>Events</Button>
          <TextField sx={{ background: "white", width: 375, mr: 2 }} id="filled-basic" label="Search events here..." variant="filled" onChange={(event) => { setSearch(event.target.value); }} onKeyPress={(event) => { handleEnter(event); }}/>
          <SearchIcon id="search" onClick={() => { displaySearch(); }}/>
          <Button sx={{ margin: 'auto' }} color={buttonColorProfile} variant="contained" onClick={() => { displayProfile(); }}>Profile</Button>
        </Toolbar>
      </AppBar>
      {displayItem}
    </div>
  );
}

export default App;
