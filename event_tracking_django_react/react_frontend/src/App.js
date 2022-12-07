import { useState, useEffect } from 'react';
import './App.css';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import DisplayProfile from './pages/DisplayProfile';

function App() {
  const [buttonColorEvents, setButtonColorEvents] = useState("primary");
  const [buttonColorProfile, setButtonColorProfile] = useState("primary");
  const [events, setEvents] = useState([""]);
  const [displayItem, setDisplayItem] = useState("");

  useEffect(() => {
    getEvents()
  }, []);

  // async function getEvents() {
  //   const response = await fetch("http://127.0.0.1:8000/api/events/")
  //   const data = await response.json()
  //   setEvents(data)
  // }

  function getEvents() {
    // filler data for now so I don't keep making request to Ticketmaster API on the back-end
    const data = [
      {
        "event_id": "vvG10Z9fLftAso",
        "title": "J.I.D & Smino - Luv Is 4ever Tour",
        "imageUrl": "https://s1.ticketm.net/dbimages/446945a.jpg",
        "date": "2023-01-31",
        "city": "Hollywood",
        "minPrice": "$59.5",
        "maxPrice": "$99.5"
      },
      {
        "event_id": "vvG10Z98iacaQ4",
        "title": "Surf Curse",
        "imageUrl": "https://s1.ticketm.net/dam/a/6dd/9200ef74-abf7-41a9-8cc7-83b178cfd6dd_1679151_TABLET_LANDSCAPE_3_2.jpg",
        "date": "2022-12-17",
        "city": "Hollywood",
        "minPrice": "$29.5",
        "maxPrice": "$49.5"
      },
      {
        "event_id": "vvG10Z98wbNwqw",
        "title": "Louis C.K.",
        "imageUrl": "https://s1.ticketm.net/dam/a/0d8/cad3cb06-e0a0-438f-bb97-2d55b09080d8_1621421_TABLET_LANDSCAPE_3_2.jpg",
        "date": "2023-01-07",
        "city": "Hollywood",
        "minPrice": "$43.0",
        "maxPrice": "$70.0"
      },
      {
        "event_id": "vvG10Z9orVldC9",
        "title": "ROLE MODEL",
        "imageUrl": "https://s1.ticketm.net/dam/a/6c1/5b5108b5-90aa-4103-9f25-3e51e99f26c1_1772831_RETINA_PORTRAIT_3_2.jpg",
        "date": "2022-12-09",
        "city": "Hollywood",
        "minPrice": "$35.0",
        "maxPrice": "$55.0"
      },
      {
        "event_id": "vvG1iZ9GJyPsts",
        "title": "Disney Presents The Lion King (Touring)",
        "imageUrl": "https://s1.ticketm.net/dam/a/6ae/daee34c2-b815-4f0f-a8c1-95189f42a6ae_1472031_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-02-04",
        "city": "Los Angeles",
        "minPrice": "$69.0",
        "maxPrice": "$169.0"
      },
      {
        "event_id": "vvG1iZ93Lihxoh",
        "title": "Lindsey Stirling - Snow Waltz Tour",
        "imageUrl": "https://s1.ticketm.net/dam/a/a88/4bc707c4-89bd-4e0a-ba12-9fdc48198a88_1784131_RETINA_PORTRAIT_16_9.jpg",
        "date": "2022-12-23",
        "city": "Los Angeles",
        "minPrice": "$50.5",
        "maxPrice": "$100.5"
      },
      {
        "event_id": "vvG1iZ9GJyN-tq",
        "title": "Disney Presents The Lion King (Touring)",
        "imageUrl": "https://s1.ticketm.net/dam/a/6ae/daee34c2-b815-4f0f-a8c1-95189f42a6ae_1472031_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-02-02",
        "city": "Los Angeles",
        "minPrice": "$33.0",
        "maxPrice": "$99.0"
      },
      {
        "event_id": "vvG10Z9o2hG406",
        "title": "AP Dhillon - Out of This World Tour",
        "imageUrl": "https://s1.ticketm.net/dam/a/83d/bde7bb16-5c6b-4a63-a188-04c1905e583d_1767921_EVENT_DETAIL_PAGE_16_9.jpg",
        "date": "2022-12-11",
        "city": "Hollywood",
        "minPrice": "$124.5",
        "maxPrice": "$149.5"
      },
      {
        "event_id": "vvG10Z9K9-c7Tj",
        "title": "Four Tet + Squidsoup",
        "imageUrl": "https://s1.ticketm.net/dam/a/bd3/73c537ec-adaf-4429-8af3-61f4adf12bd3_1795041_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-05-03",
        "city": "Hollywood",
        "minPrice": "$49.5",
        "maxPrice": "$49.5"
      },
      {
        "event_id": "vvG10Z98wb03qT",
        "title": "Louis C.K.",
        "imageUrl": "https://s1.ticketm.net/dam/a/0d8/cad3cb06-e0a0-438f-bb97-2d55b09080d8_1621421_TABLET_LANDSCAPE_3_2.jpg",
        "date": "2023-01-08",
        "city": "Hollywood",
        "minPrice": "$43.0",
        "maxPrice": "$70.0"
      },
      {
        "event_id": "vvG1iZ9GJyEvtU",
        "title": "Disney Presents The Lion King (Touring)",
        "imageUrl": "https://s1.ticketm.net/dam/a/6ae/daee34c2-b815-4f0f-a8c1-95189f42a6ae_1472031_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-02-05",
        "city": "Los Angeles",
        "minPrice": "$69.0",
        "maxPrice": "$169.0"
      },
      {
        "event_id": "vvG10Z9KpxCeSj",
        "title": "John Mellencamp: Live and In Person",
        "imageUrl": "https://s1.ticketm.net/dam/a/28f/0e473ba9-9d40-48bd-ade5-e0ea8936b28f_1801431_TABLET_LANDSCAPE_16_9.jpg",
        "date": "2023-03-22",
        "city": "Hollywood",
        "minPrice": "$44.5",
        "maxPrice": "$134.5"
      },
      {
        "event_id": "vvG10Z9fLfjgs7",
        "title": "J.I.D & Smino - Luv Is 4ever Tour",
        "imageUrl": "https://s1.ticketm.net/dbimages/446945a.jpg",
        "date": "2023-01-30",
        "city": "Hollywood",
        "minPrice": "$59.5",
        "maxPrice": "$99.5"
      },
      {
        "event_id": "vvG10Z9K9-mfTO",
        "title": "Four Tet + Squidsoup",
        "imageUrl": "https://s1.ticketm.net/dam/a/bd3/73c537ec-adaf-4429-8af3-61f4adf12bd3_1795041_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-05-04",
        "city": "Hollywood",
        "minPrice": "$49.5",
        "maxPrice": "$49.5"
      },
      {
        "event_id": "vvG1iZ9GJynsn8",
        "title": "Disney Presents The Lion King (Touring)",
        "imageUrl": "https://s1.ticketm.net/dam/a/6ae/daee34c2-b815-4f0f-a8c1-95189f42a6ae_1472031_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-02-11",
        "city": "Los Angeles",
        "minPrice": "$69.0",
        "maxPrice": "$169.0"
      },
      {
        "event_id": "vvG1iZ9GJyRonz",
        "title": "Disney Presents The Lion King (Touring)",
        "imageUrl": "https://s1.ticketm.net/dam/a/6ae/daee34c2-b815-4f0f-a8c1-95189f42a6ae_1472031_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-02-18",
        "city": "Los Angeles",
        "minPrice": "$69.0",
        "maxPrice": "$169.0"
      },
      {
        "event_id": "vvG1iZ9fhggPfn",
        "title": "Taylor Tomlinson: The Have It All Tour",
        "imageUrl": "https://s1.ticketm.net/dam/a/be9/3efd5cbe-d982-4afb-b232-3f92181f5be9_1711421_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-04-29",
        "city": "Los Angeles",
        "minPrice": "$29.75",
        "maxPrice": "$59.75"
      },
      {
        "event_id": "vvG1iZ9CwPzvUL",
        "title": "The Book of Mormon (Touring)",
        "imageUrl": "https://s1.ticketm.net/dam/a/70c/f8408501-c120-4b57-a857-a1711722970c_241621_CUSTOM.jpg",
        "date": "2022-12-10",
        "city": "Los Angeles",
        "minPrice": "$59.0",
        "maxPrice": "$249.0"
      },
      {
        "event_id": "vvG10Z94SmCEp3",
        "title": "Ken Carson",
        "imageUrl": "https://s1.ticketm.net/dam/a/989/bfe3c962-0cf1-4bc9-9ea0-980a8161c989_1858441_TABLET_LANDSCAPE_LARGE_16_9.jpg",
        "date": "2022-12-31",
        "city": "Hollywood",
        "minPrice": "$35.0",
        "maxPrice": "$59.5"
      },
      {
        "event_id": "vvG1iZ9GJy0-tE",
        "title": "Disney Presents The Lion King (Touring)",
        "imageUrl": "https://s1.ticketm.net/dam/a/6ae/daee34c2-b815-4f0f-a8c1-95189f42a6ae_1472031_RETINA_PORTRAIT_16_9.jpg",
        "date": "2023-02-03",
        "city": "Los Angeles",
        "minPrice": "$42.0",
        "maxPrice": "$115.0"
      }
    ]

    setEvents(data)
  }

  async function getEventDetails(event_id) {
    const response = await fetch(`http://127.0.0.1:8000/api/events/id/${event_id}/`);
    const data = await response.json();
    
    return data
  }

  async function addEvent(event_id, title, date, city, imageUrl, minPrice, maxPrice) {
    await fetch(`http://127.0.0.1:8000/api/profile/save/event/id/${event_id}/`, {
    method: "POST",
    body: JSON.stringify({
        event_id: event_id,
        title: title,
        date: date,
        city: city,
        imageUrl: imageUrl,
        minPrice: minPrice,
        maxPrice: maxPrice,
        })
    })
  }

  function displayEvents() {
    if (buttonColorEvents === "primary") {
      setButtonColorEvents("success")
      setButtonColorProfile("primary")

      setDisplayItem (
        <div className="events">
          {events.map((event, i) =>
            <div className={event.id} id="event_border" key={i}>
              <center>
                <br></br>
                <Typography><b>{event.title}</b></Typography>
                <br></br>
                <Typography>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                <br></br>
                <img src={event.imageUrl} alt="image not found" width={225} height={126} onClick={() => { displayEventDetails(event.event_id); }}/>
                <br></br>
                <br></br>
                <Typography>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                <br></br>
                <Button variant="contained" id={event.id} onClick={() => { addEvent(event.event_id, event.title, event.date, event.city, event.imageUrl, event.minPrice, event.maxPrice); }}>ADD EVENT</Button>
                <br></br>
                <br></br>
              </center>
            </div>
          )}
        </div>
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
