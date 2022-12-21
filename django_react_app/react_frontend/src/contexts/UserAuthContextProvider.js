import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import UserAuthContext from './UserAuthContext';
import { useNavigate } from 'react-router-dom';

function UserAuthContextProvider({children}) {
    const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    function clearLoginMessage() {
        setMessage(null);
    }

    async function login(e){
        e.preventDefault()
        // const response = await fetch('http://127.0.0.1:8000/api/token/', {
        const response = await fetch('http://127.0.0.1/api/token/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            })
        });
        const data = await response.json()
        
        if(response.status === 200) {
            setUser(jwt_decode(data.access));
            setMessage(null);
            localStorage.setItem("authTokens", JSON.stringify(data))
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

    function logout() {
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login/")
    }

    const data = {
        user: user,
        message: message,
        clearLoginMessage: clearLoginMessage,
        login: login,
        logout: logout
    }

    return (
        <UserAuthContext.Provider value={data}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthContextProvider;