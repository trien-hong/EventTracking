import { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import DisplayEvents from './pages/DisplayEvents';
import DisplayProfile from './pages/DisplayProfile';

function App() {
  const [buttonColorEvents, setButtonColorEvents] = useState("primary");
  const [buttonColorProfile, setButtonColorProfile] = useState("primary");
  const [displayItem, setDisplayItem] = useState("");

  async function getEventDetails(event_id) {
    const response = await fetch(`http://127.0.0.1:8000/api/events/id/${event_id}/`);
    const data = await response.json();
    
    return data
  }

  function displayEvents() {
    if (buttonColorEvents === "primary") {
      setButtonColorEvents("success")
      setButtonColorProfile("primary")

      setDisplayItem (
        <DisplayEvents/>  
      )
    } else {
      setButtonColorEvents("primary")
      setButtonColorProfile("primary")
      setDisplayItem(null)
    }
  }

  function displayProfile() {
    if (buttonColorProfile === "primary") {
      setButtonColorEvents("primary")
      setButtonColorProfile("success")
      
      setDisplayItem (
        <DisplayProfile/>
      )
    } else {
      setButtonColorEvents("primary")
      setButtonColorProfile("primary")
      setDisplayItem(null)
    }
  }
  
  async function displayEventDetails(event_id) {
    const eventDetails = await getEventDetails(event_id)
    setButtonColorEvents("primary")
    setButtonColorProfile("primary")

    setDisplayItem(
      <div>
        <br></br>
        <center>
          <div className={eventDetails.event_id} id="event_border">
            <Typography variant="h5"><b>{eventDetails.title}</b></Typography>
            <br></br>
            <img src={eventDetails.imageUrl} alt="image not found" width={700} height={393}/>
            <br></br>
            <br></br>
            <Typography variant="h6"><b>Date:</b> {eventDetails.date}</Typography>
            <Typography variant="h6"><b>Genre:</b> {eventDetails.genre}</Typography>
            <Typography variant="h6"><b>Venu:</b> {eventDetails.venu}</Typography>
            <Typography variant="h6"><b>Address:</b> {eventDetails.address}</Typography>
            <Typography variant="h6"><b>Price:</b> {eventDetails.minPrice} &nbsp;-&nbsp; {eventDetails.maxPrice}</Typography>
          </div>
        </center>
        <br></br>
      </div>
    )
  }

  return (
    <div className="App">
      <AppBar position="static" sx={{ background: "gray" }}>
        <Toolbar>
          <Button sx={{ margin: 'auto' }} color={buttonColorEvents} variant="contained" onClick={() => { displayEvents(); }}>Events</Button>
          <Button sx={{ margin: 'auto' }} color={buttonColorProfile} variant="contained" onClick={() => { displayProfile(); }}>Profile</Button>
        </Toolbar>
      </AppBar>
      {displayItem}
    </div>
  );
}

export default App;
