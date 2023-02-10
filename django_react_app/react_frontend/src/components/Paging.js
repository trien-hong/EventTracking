import { useEffect, useState, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { AppBar, Box, Pagination, Toolbar, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import UserAuthContext from '../contexts/UserAuthContext';

function Paging({setEvents, setSearchEvents, setIsLoading, eventsPerPage, sortingOptions}) {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {authTokens} = useContext(UserAuthContext);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q");
    const location = useLocation();

    // i am aware of the double calls to the API in useEffect. i'll try to fix later.

    useEffect(() => {
        if (location.pathname === "/events" || location.pathname === "/events/" || location.pathname === "/") {
            document.title = `Events | Page #${currentPage}`;
            getEvents();
        }
        if (location.pathname === "/search" || location.pathname === "/search/") {
            document.title = `${search} | Page #${currentPage}`;
            getSearchEvents();
        }
    }, [currentPage, eventsPerPage, sortingOptions, search]);

    useEffect(() => {
        if (location.pathname === "/search" || location.pathname === "/search/") {
            setCurrentPage(1);
        }
    }, [search]);

    useEffect(() => {
        setCurrentPage(1);
    }, [eventsPerPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortingOptions]);

    async function getEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/size/${eventsPerPage}/page/${currentPage-1}/sort/${sortingOptions}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/size/${eventsPerPage}/page/${currentPage-1}/sort/${sortingOptions}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            if (data !== false) {
                setTotalPages(data.at(-1)["totalPages"]);
            }
            data.pop();
            setEvents(data);
            setIsLoading(false);
            scrollUp();
        } else {
            setIsLoading(false);
        }
    }

    async function getSearchEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${search}/size/${eventsPerPage}/page/${currentPage-1}/sort/${sortingOptions}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/search/input/${search}/size/${eventsPerPage}/page/${currentPage-1}/sort/${sortingOptions}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            if (data !== false) {
                setTotalPages(data.at(-1)["totalPages"]);
                data.pop();
            } else {
                setTotalPages(0);
            }
            setSearchEvents(data);
            setIsLoading(false);
            scrollUp();
        } else {
            setSearchEvents(null);
            setIsLoading(false);
        }
    }

    function changePage(event, value) {
        setCurrentPage(value);
    }

    function scrollUp() {
        window.scrollTo({top: 0, behavior: "smooth" });
    }

    function scrollDown() {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth" });
    }

    return (
        <div>
            <AppBar position="static" sx={{ position: "fixed", bottom: 0, color: "black", background: "lightgray" }}>
                <Toolbar style={{ pt: 3, minHeight: 40 }}>
                    <Box sx={{ margin: "auto", display:"flex", alignItems:"center" }}>
                    <Pagination count={totalPages + 1} page={currentPage} onChange={changePage} color="primary" />
                    <Tooltip title="Scroll to Top">
                        <ArrowUpwardIcon sx={{ background: "white", position: "fixed", right: 10 }} id="scroll" onClick={() => { scrollUp(); }}/>
                    </Tooltip>
                    <Tooltip title="Scroll to Bottom">
                        <ArrowDownwardIcon sx={{ background: "white", position: "fixed", right: 45 }} id="scroll" onClick={() => { scrollDown(); }}/>
                    </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Paging;