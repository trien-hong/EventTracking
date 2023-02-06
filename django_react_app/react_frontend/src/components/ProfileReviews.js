import { useEffect, useState, useContext } from 'react';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import UserAuthContext from '../contexts/UserAuthContext';
import Loading from './Loading';
import MyReviews from './MyReviews';

function ProfileReviews() {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);

    useEffect(() => {
        document.title = `Profile Reviews | ${user.username}`;
        getProfileReviews();
    }, []);

    async function getProfileReviews() {
        // const response = await fetch(`http://127.0.0.1:8000/api/profile/reviews/`, {
        const response = await fetch(`http://127.0.0.1/api/profile/reviews/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        if (response.status === 200) {
            const data = await response.json();
            setReviews(data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    {reviews ? (
                        <div>
                            <div id="reviewBorder">
                                <Typography sx={{ mb: 2 }} variant="h4">All Reviews You've Left</Typography>
                                {reviews.map((review, i) =>
                                    <div key={i}>
                                        <div id="review">
                                            <MyReviews reviews={reviews} review={review} setReviews={setReviews}/>
                                        </div>
                                        <br></br>
                                    </div>
                                )}
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </div>
                    ) : (
                        <div id="container">
                            <Typography id="errors" variant="h5" align="center">Sorry, the page you were looking for does not exist.<br></br>You'll automatically be redirect shortly.</Typography>
                            <Divider sx={{ mt: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="error" label="ERROR" icon={ <ErrorIcon/> }/></Divider>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileReviews;