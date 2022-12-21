import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import UserAuthContext from './UserAuthContext';

function UserAuthContextProvider({children}) {
    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const loginUser = async(e) => {
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
            setUserInfo(jwt_decode(data.access));
            setErrorMessage(null);
        } else {
            alert(data["detail"]);
            setErrorMessage(data["detail"]);
        }
    }

    const data = {
        userInfo: userInfo,
        errorMessage: errorMessage,
        loginUser: loginUser
    }

    return (
        <UserAuthContext.Provider value={data}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthContextProvider;