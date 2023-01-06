import { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import UserAuthContext from '../contexts/UserAuthContext';
import AddEventButton from '../components/AddEventButton';

function Search() {
    const [searchEvents, setSearchEvents] = useState([""]);
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [leftArrowIcon, setLeftArrowIcon] = useState(null);
    const [rightArrowIcon, setRightArrowIcon] = useState(null);
    const [doubleLeftArrowIcon, setDoubleLeftArrowIcon] = useState(null);
    const [doubleRightArrowIcon, setDoubleRightArrowIcon] = useState(null);
    const {authTokens} = useContext(UserAuthContext);
    const search = searchParams.get("q");
    const navigate = useNavigate();
    let totalPages = 0;

    useEffect(() => {
        setCurrentPage(0);
    }, [search]);

    useEffect(() => {
        document.title = `${search} | Page #${currentPage}`
        getSearchEvents();
    }, [currentPage, search]);

    async function getSearchEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${search}/page/${currentPage}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/search/input/${search}/page/${currentPage}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        const data = await response.json();
        if (data !== false) {
            totalPages = data.at(-1)["totalPages"];
            data.pop();
        }
        setSearchEvents(data);
        checkPages();
    };

    function checkPages() {
        if(currentPage === 0) {
            setLeftArrowIcon(null);
            setDoubleLeftArrowIcon(null);
        } else {
            setLeftArrowIcon(<ArrowBackIosNewIcon sx={{ px: 1, mt: 0.5 }} onClick={() => { decreasePageNumber(); }}/>);
            setDoubleLeftArrowIcon(<KeyboardDoubleArrowLeftIcon sx={{ mp: 1, mt: 0.5 }} onClick={() => { goToFirstPage(); }}/>);
        }

        if(currentPage === totalPages) {
            setRightArrowIcon(null);
            setDoubleRightArrowIcon(null);
        } else {
            setRightArrowIcon(<ArrowForwardIosIcon sx={{ px: 1, mt: 0.5 }} onClick={() => { increasePageNumber(); }}/>);
            setDoubleRightArrowIcon(<KeyboardDoubleArrowRightIcon sx={{ px: 1, mt: 0.5 }} onClick={() => { goToLastPage(); }}/>);
        }
    }

    function decreasePageNumber() {
        setCurrentPage(prevState => prevState - 1);
    }

    function increasePageNumber() {
        setCurrentPage(prevState => prevState + 1);
    }

    function goToFirstPage() {
        setCurrentPage(0);
    }

    function goToLastPage() {
        setCurrentPage(totalPages);
    }

    function goToEventDetails(event_id) {
        navigate(`/events/details/id/${event_id}/`);
    }

    return (
        <div>
            {searchEvents ? (
                <div id="content">
                    <div id="events">
                        {searchEvents.map((event, i) =>
                            <div id="eventBorder" key={i}>
                                <center>
                                    <br></br>
                                    <Typography><b><i>{event.title}</i></b></Typography>
                                    <br></br>
                                    <Typography>{event.date} &nbsp;|&nbsp; {event.city}</Typography>
                                    <br></br>
                                    <img src={event.imageUrl} alt="not found" onClick={() => { goToEventDetails(event.event_id); }}/>
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
                    <AppBar position="static" sx={{ alignItems: "center", color: "black", background: "lightgray", position: "fixed", bottom: 0 }}>
                        <Toolbar style={{ minHeight: 35 }}>
                            <Box sx={{ margin: "auto", display:"flex", alignItems:"center" }}>
                                <div id="firstPageDoubleArrow">
                                    {doubleLeftArrowIcon}
                                </div>
                                <div id="decreasePageNumberArrow">
                                    {leftArrowIcon}
                                </div>
                                <Typography id="pageNumberBorder" variant="h6" >Page #<u>{currentPage}</u></Typography>
                                <div id="increasePageNumberArrow">
                                    {rightArrowIcon}
                                </div>
                                <div id="lastPageDoubleArrow">
                                    {doubleRightArrowIcon}
                                </div>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </div>
            ) : (
                <div>
                    <br></br>
                    <Typography id="errors" variant="h5" align="center">Your search of "{search}" came back empty.</Typography>
                </div>
            )}
        </div>
    );
}

export default Search;