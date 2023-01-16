import { useEffect, useState, useContext } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAuthContext from '../contexts/UserAuthContext';
import Loading from './Loading';
import EditReview from './EditReview';

function ProfileReviews() {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const {authTokens} = useContext(UserAuthContext);

    useEffect(() => {
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
        const data = await response.json();
        console.log(data);
        setReviews(data);
        setIsLoading(false);
    }
    
    async function deleteReview(review_id) {
        // await fetch(`http://127.0.0.1:8000/api/user/reviews/`, {
        await fetch(`http://127.0.0.1/api/user/reviews/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                review_id: review_id,
            })
        });
        getProfileReviews();
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
                            <div id="reviewBorder">
                                <Typography sx={{ my: 2 }} variant="h4">All Reviews You've Left</Typography>
                                {reviews.map((review, i) =>
                                    <div>
                                        <div id="review" key={i}>
                                            <Tooltip title="Delete Review">
                                                <DeleteIcon sx={{ mx: 0.5, mt: 0.5, float: "right" }} id="userReviewIcon" onClick={() => { deleteReview(review.id); }}/>
                                            </Tooltip>
                                            <EditReview review={review} setReviews={setReviews}/>
                                            <Box sx={{ ml: 1.25, textAlign: "left" }}>
                                                <Typography sx={{ mt: 1.5 }}><b>{review.username}</b></Typography>
                                                <Typography><b>Reviewed On: </b>{review.dateAdded}</Typography>
                                                <Typography><b>Event Title: </b>{review.title}</Typography>
                                                <Typography><b>Rating: </b>{review.userRating}/5</Typography>
                                                <Typography sx={{ mb: 1.5 }}><b>Comment: </b>{review.userComment}</Typography>
                                            </Box>
                                        </div>
                                        <br></br>
                                    </div>
                                )}
                            </div>
                    ) : (
                        <div>
                            <Typography id="errors" variant="h5" align="center">You have not added any reviews yet.</Typography>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileReviews;