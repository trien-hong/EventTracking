import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UserAuthContext from '../contexts/UserAuthContext';
import AddEventButton from '../components/AddEventButton';

function Events() {
    const [events, setEvents] = useState([""]);
    const [totalPages, setTotalPages] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [leftArrowIcon, setLeftArrowIcon] = useState(null);
    const [rightArrowIcon, setRightArrowIcon] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Events | Page #${currentPage}`
        getEvents();
    }, [currentPage]);

    async function getEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/page/${currentPage}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/page/${currentPage}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        const data = await response.json();
        if (data !== false) {
            setTotalPages(data.at(-1)["totalPages"]);
            data.pop();
        }
        setEvents(data);
        checkPages();
    }

    function checkPages() {
        if(currentPage === 0) {
            setLeftArrowIcon(null);
        } else {
            setLeftArrowIcon(<ArrowBackIosNewIcon sx={{ mr: 1.5, mt: 0.5 }} onClick={() => { decreasePageNumber(); }}/>);
        }

        if(currentPage === totalPages) {
            setRightArrowIcon(null);
        } else {
            setRightArrowIcon(<ArrowForwardIosIcon sx={{ ml: 1.5, mt: 0.5 }} onClick={() => { increasePageNumber(); }}/>);
        }
    }

    function decreasePageNumber() {
        setCurrentPage(prevState => prevState - 1);
    }

    function increasePageNumber() {
        setCurrentPage(prevState => prevState + 1);
    }

    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div>
            {events ? (
                <div id="content">
                    <div id="events">
                        {events.map((event, i) =>
                            <div id="eventBorder" key={i}>
                                <center>
                                    <br></br>
                                    <Typography><b><i>{event.title}</i></b></Typography>
                                    <br></br>
                                    <Typography>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                    <br></br>
                                    <img src={event.imageUrl} alt="image not found" width={225} height={126} onClick={() => { goToEventDetails(event.event_id); }}/>
                                    <br></br>
                                    <br></br>
                                    <Typography>{event.minPrice} &nbsp;-&nbsp; {event.maxPrice}</Typography>
                                    <br></br>
                                    <AddEventButton event={event}/>
                                    <br></br>
                                </center>
                            </div>
                        )}
                    </div>
                    <AppBar position="static" sx={{ alignItems: "center", color: "black", background: "lightgray", position: 'fixed', bottom: 0 }}>
                        <Toolbar style={{ minHeight: 35 }}>
                            <Box sx={{ margin: "auto", display:"flex", alignItems:"center" }}>
                                <div id="decreasePageNumberArrow">
                                    {leftArrowIcon}
                                </div>
                                <Typography id="pageNumberBorder" variant="h6" >Page #<u>{currentPage}</u></Typography>
                                <div id="increasePageNumberArrow">
                                    {rightArrowIcon}
                                </div>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </div>
            ) : (
                <div>
                    <br></br>
                    <Typography id="errors" variant="h5" align="center">Your ZIP code of "{user.zip_code}" did not have any events.</Typography>
                </div>
            )}
        </div>
    );
}

export default Events;