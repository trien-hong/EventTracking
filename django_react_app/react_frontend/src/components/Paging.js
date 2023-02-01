import { useEffect, useState, useContext } from "react";
import { AppBar, Box, Pagination, Toolbar, Tooltip } from '@mui/material';
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

    async function getEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/page/${currentPage - 1}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/page/${currentPage - 1}/`, {
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
            }
            setEvents(data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    async function getSearchEvents() {
        // const response = await fetch(`http://127.0.0.1:8000/api/events/search/input/${search}/page/${currentPage - 1}/`, {
        const response = await fetch(`http://127.0.0.1/api/events/search/input/${search}/page/${currentPage - 1}/`, {
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