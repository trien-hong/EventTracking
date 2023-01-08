import { useEffect, useState, useContext } from "react";
import { Box, AppBar, Toolbar, Pagination } from '@mui/material';
import { useLocation, useSearchParams } from "react-router-dom";
import UserAuthContext from '../contexts/UserAuthContext';

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

    return (
        <div>
            <AppBar position="static" sx={{ alignItems: "center", color: "black", background: "lightgray", position: "fixed", bottom: 0 }}>
                <Toolbar style={{ pt: 3, minHeight: 40 }}>
                    <Box sx={{ margin: "auto", display:"flex", alignItems:"center" }}>
                        <Pagination count={totalPages + 1} onChange={changePage} color="primary" />
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Paging;