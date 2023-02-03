import { useState, useContext, useEffect } from 'react';
import ProfilePictureContext from './ProfilePictureContext';
import UserAuthContext from './UserAuthContext';

function ProfilePictureContextProvider({children}) {
    const [isProfilePictureLoaded, setIsProfilePictureLoaded] = useState(false)
    const [profilePictureLocation, setProfilePictureLocation] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);

    useEffect(() => {
        if (user === null) {
            clearProfilePicture();
            setIsProfilePictureLoaded(false);
        }
        if (user !== null && isProfilePictureLoaded === false) {
            getProfilePicture();
            setIsProfilePictureLoaded(true);
        }
    }, [user]);

    async function getProfilePicture() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/settings/picture/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/settings/picture/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            setProfilePictureLocation(data.profile_picture);
        }
    }

    async function deleteProfilePicture() {
        if (window.confirm("Are you sure you want to delete your current profile picture?") == true) {
            // const response = await fetch(`http://127.0.0.1:8000/api/profile/settings/picture/`, {
            const response = await fetch(`http://127.0.0.1/api/profile/settings/picture/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + String(authTokens.access)
                }
            });
            if (response.status === 200) {
                clearProfilePicture();
                alert("Profile picture has been deleted.")
            } else {
                alert("There seems to be an error in deleting your profile picture.")
            }
        }
    }

    function clearProfilePicture() {
        setProfilePictureLocation(null);
        setIsProfilePictureLoaded(false)
    }

    const data = {
        setIsProfilePictureLoaded: setIsProfilePictureLoaded,
        profilePictureLocation: profilePictureLocation,
        getProfilePicture: getProfilePicture,
        deleteProfilePicture: deleteProfilePicture,
        clearProfilePicture: clearProfilePicture
    };

    return (
        <ProfilePictureContext.Provider value={data}>
            {children}
        </ProfilePictureContext.Provider>
    );
}

export default ProfilePictureContextProvider;