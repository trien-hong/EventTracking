import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UserAuthContext from '../contexts/UserAuthContext';
import AddEventButton from '../components/AddEventButton';

function Events() {
    const [events, setEvents] = useState([""]);
    const [totalPages, setTotalPages] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [leftArrowIcon, setLeftArrowIcon] = useState(<ArrowBackIosNewIcon sx={{ mr: 1.5, mt: 0.5 }} onClick={() => {decreasePageNumber()}}/>);
    const [rightArrowIcon, setRightArrowIcon] = useState(<ArrowForwardIosIcon sx={{ ml: 1.5, mt: 0.5 }} onClick={() => {increasePageNumber()}}/>);
    const {user, authTokens} = useContext(UserAuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Events"
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

        if(currentPage === 0) {
            setLeftArrowIcon(null);
        } else {
            setLeftArrowIcon(<ArrowBackIosNewIcon sx={{ mr: 1.5, mt: 0.5 }} onClick={() => {decreasePageNumber()}}/>);
        }

        if(currentPage === totalPages) {
            setRightArrowIcon(null);
        } else {
            setRightArrowIcon(<ArrowForwardIosIcon sx={{ ml: 1.5, mt: 0.5 }} onClick={() => {increasePageNumber()}}/>);
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
                <div className="content">
                    <div className="events">
                        {events.map((event, i) =>
                            <div className={event.event_id} id="event_border" key={i}>
                                <center>
                                    <br></br>
                                    <Typography><b>{event.title}</b></Typography>
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
                    <Box sx={{ mb: 2}} m={1} display="flex" justifyContent="center" alignItems="center">
                        <div id="leftArrow">
                            {leftArrowIcon}
                        </div>
                        <Typography id="page_number_border" variant="h6" >Page #{currentPage}</Typography>
                        <div id="rightArrow">
                            {rightArrowIcon}
                        </div>
                    </Box>
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