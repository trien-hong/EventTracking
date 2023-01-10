import { useEffect, useState, useContext } from "react";
import { Box, AppBar, Toolbar, Pagination, Tooltip } from '@mui/material';
import { useLocation, useSearchParams } from "react-router-dom";
import UserAuthContext from '../contexts/UserAuthContext';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Paging({setEvents, setSearchEvents, setIsLoading}) {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {authTokens} = useContext(UserAuthContext);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q");
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/events" || location.pathname === "/events/" || location.pathname === "/") {
            document.title = `Events | Page #${currentPage}`;
            getEvents();
        }
    }, [currentPage]);

    async function getEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/page/${currentPage - 1}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/page/${currentPage - 1}/`, {
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
        setIsLoading(false);
    }

    useEffect(() => {
        if (location.pathname === "/search" || location.pathname === "/search/") {
            setCurrentPage(1);
        }
    }, [search]);

    useEffect(() => {
        if (location.pathname === "/search" || location.pathname === "/search/") {
            document.title = `${search} | Page #${currentPage}`;
            getSearchEvents();
        }
    }, [currentPage, search]);

    async function getSearchEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${search}/page/${currentPage - 1}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/search/input/${search}/page/${currentPage - 1}/`, {
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
        } else {
            setTotalPages(0);
        }
        setSearchEvents(data);
        setIsLoading(false);
    };

    function changePage(event, value) {
        setCurrentPage(value);
    }

    function scrollUp() {
        window.scrollTo(0, 0);
    }

    function scrollDown() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <AppBar position="static" sx={{ position: "fixed", bottom: 0, color: "black", background: "lightgray" }}>
            <Toolbar style={{ pt: 3, minHeight: 40 }}>
                <Box sx={{ margin: "auto", display:"flex", alignItems:"center" }}>
                <Pagination count={totalPages + 1} page={currentPage} onChange={changePage} color="primary" />
                <Tooltip title="Scroll to Top">
                    <ArrowUpwardIcon sx={{ background: "white", position: "fixed", bottom: 8, right: 15 }} id="scrollUp" onClick={() => { scrollUp(); }}/>
                </Tooltip>
                <Tooltip title="Scroll to Bottom">
                    <ArrowDownwardIcon sx={{ background: "white", position: "fixed", bottom: 8, right: 50}} id="scrollDown" onClick={() => { scrollDown(); }}/>
                </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Paging;