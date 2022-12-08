import { useState } from 'react';
import './App.css';
import { AppBar, Toolbar, Button } from '@mui/material';
import DisplayEvents from './pages/DisplayEvents';
import DisplayProfile from './pages/DisplayProfile';
import DisplayEventDetails from './pages/DisplayEventDetails';

function App() {
  const [buttonColorEvents, setButtonColorEvents] = useState("primary");
  const [buttonColorProfile, setButtonColorProfile] = useState("primary");
  const [displayItem, setDisplayItem] = useState("");

  const displayEventDetails = (event_id) => {
    setButtonColorEvents("primary")
    setButtonColorProfile("primary")
    
    setDisplayItem (
      <DisplayEventDetails data={event_id}/>
    )
  }

  function displayEvents() {
    if (buttonColorEvents === "primary") {
      setButtonColorEvents("success")
      setButtonColorProfile("primary")

      setDisplayItem (
        <DisplayEvents data={displayEventDetails}/>
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
        <DisplayProfile data={displayEventDetails}/>
      )
    } else {
      setButtonColorEvents("primary")
      setButtonColorProfile("primary")
      setDisplayItem(null)
    }
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
