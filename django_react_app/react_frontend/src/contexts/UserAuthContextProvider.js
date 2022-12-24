import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import UserAuthContext from './UserAuthContext';

function UserAuthContextProvider({children}) {
    const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) {
            updateToken();
        }

        const nineMinutes = 1000 * 60 * 9;
        const interval = setInterval(() => {
           if(authTokens) {
                updateToken();
           }
        }, nineMinutes);
        return (() => clearInterval(interval));
    }, [authTokens, loading]);

    function clearLoginMessage() {
        setMessage(null);
    }

    async function login(e){
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
        const response = await fetch(`http://127.0.0.1:/api/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            })
        });
        const data = await response.json();
        
        if(response.status === 200) {
            setUser(jwt_decode(data.access));
            setAuthTokens(data);
            setMessage(null);
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate(`/events/`);
        } else {
            alert(data["detail"]);
            setMessage(
                <div id="errors">
                    ERROR: {data["detail"]}.
                    <hr></hr>
                </div>
            );
        }
    }

    async function updateToken() {
        // const response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {
        const response = await fetch(`http://127.0.0.1/api/token/refresh/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "refresh": authTokens?.refresh
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
        } else {
            logout();
        }

        if(loading) {
            setLoading(false);
        }
    }

    function logout() {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem("authTokens");
        navigate(`/login/`);
    }

    const data = {
        user: user,
        message: message,
        authTokens: authTokens,
        clearLoginMessage: clearLoginMessage,
        login: login,
        logout: logout
    }

    return (
        <UserAuthContext.Provider value={data}>
            {loading ? null : children}
        </UserAuthContext.Provider>
    );
}

export default UserAuthContextProvider;