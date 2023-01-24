import { useEffect, useState, useContext } from 'react';
import { Avatar, Box, Rating, Grid, Stack, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';
import Loading from './Loading';
import EditReview from './EditReview';

function ProfileReviews() {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const {user, authTokens} = useContext(UserAuthContext);
    const {profilePictureLocation} = useContext(ProfilePictureContext);

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
        const data = await response.json();
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
        setReviews(null);
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
                        <div>
                            <div id="reviewBorder">
                                <Typography sx={{ mb: 2 }} variant="h4">All Reviews You've Left</Typography>
                                {reviews.map((review, i) =>
                                    <div key={i}>
                                        <div id="review">
                                            <Box sx={{ mx: 1.25, textAlign: "left" }}>
                                                <Stack sx={{ mt: 1.5, mb: 1.3 }} direction="row" alignItems="center" spacing={2}>
                                                    <Grid>
                                                        <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }} src={"http://localhost:8000" + profilePictureLocation.profile_picture} alt={user.username}>{review.username.charAt(0)}</Avatar>
                                                    </Grid>
                                                    <Grid>
                                                        <Typography variant="body1"><b>{review.username}</b></Typography>
                                                    </Grid>
                                                    <Grid container justifyContent="flex-end">
                                                        <EditReview className={i} review={review} setReviews={setReviews}/>
                                                        <Tooltip title="Delete Review">
                                                            <DeleteIcon sx={{ ml: 0.5 }} id="userReviewIcon" onClick={() => { deleteReview(review.id); }}/>
                                                        </Tooltip>
                                                    </Grid>
                                                </Stack>
                                                <hr></hr>
                                                <Typography sx={{ mt: 1 }} variant="body1"><b>Reviewed On: </b>{review.dateAdded}</Typography>
                                                <Typography variant="body1"><b>Event Title: </b>{review.title}</Typography>
                                                    <Stack alignItems="center" direction="row">
                                                        <Typography variant="body1">
                                                            <b>Rating: </b>
                                                        </Typography>
                                                        <Rating sx={{ ml: 0.5, fontSize: 20 }} value={parseInt(review.userRating)} readOnly/>
                                                    </Stack>
                                                <Typography sx={{ mb: 1.5 }} variant="body1"><b>Comment: </b>{review.userComment}</Typography>
                                            </Box>
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