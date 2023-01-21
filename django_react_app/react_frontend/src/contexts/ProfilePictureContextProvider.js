import { useState, useContext, useEffect } from 'react';
import ProfilePictureContext from './ProfilePictureContext';
import UserAuthContext from './UserAuthContext';

function ProfilePictureContextProvider({children}) {
    const [profilePictureLocation, setProfilePictureLocation] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);

    useEffect(() => {
        if (user === null) {
            clearProfilePicture();
        }
    }, [user]);

    useEffect(() => {
        if (user !== null) {
            getProfilePicture();
        }
    }, [user]);

    async function getProfilePicture() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/picture/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/picture/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        });
        const data = await response.json();
        setProfilePictureLocation(data);
    }

    function clearProfilePicture() {
        setProfilePictureLocation(null);
    }

    const data = {
        profilePictureLocation: profilePictureLocation,
        getProfilePicture: getProfilePicture,
        clearProfilePicture: clearProfilePicture
    };

    return (
        <ProfilePictureContext.Provider value={data}>
            {children}
        </ProfilePictureContext.Provider>
    );
}

export default ProfilePictureContextProvider;