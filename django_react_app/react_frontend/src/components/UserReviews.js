import { useContext } from 'react';
import { Avatar, Box, Rating, Stack, Grid, Typography } from '@mui/material';
import ProfilePictureContext from '../contexts/ProfilePictureContext';
import EditReview from './EditReview';
import DeleteReview from './DeleteReview';

function UserReviews({reviews, review, setReviews}) {
    const {profilePictureLocation} = useContext(ProfilePictureContext);

    return (
        <Box sx={{ mx: 1.25, textAlign: "left" }}>
            <Stack sx={{ mt: 1.5, mb: 1.3 }} direction="row" alignItems="center" spacing={1.25}>
                <Grid>
                    <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }} src={"http://localhost:8000" + profilePictureLocation.profile_picture} alt={review.username}>{review.username.charAt(0)}</Avatar>
                </Grid>
                <Grid>
                    <Typography variant="body2"><b>{review.username}</b></Typography>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <EditReview id={"review_id=" + review.id} reviews={reviews} review={review} setReviews={setReviews}/>
                    <DeleteReview reviews={reviews} review={review} setReviews={setReviews} onClick={() => { document.getElementById("review_id=" + review.id).remove(); }}/>
                </Grid>
            </Stack>
            <hr></hr>
            <Typography sx={{ mt: 1 }} variant="body2"><b>Reviewed On: </b>{review.dateAdded}</Typography>
            <Typography variant="body2"><b>Event Title: </b>{review.title}</Typography>
            <Stack alignItems="center" direction="row">
                <Typography variant="body2">
                    <b>Rating: </b>
                </Typography>
                <Rating sx={{ ml: 0.5, fontSize: 20 }} value={parseInt(review.userRating)} readOnly/>
            </Stack>
            <Typography sx={{ mb: 1.5 }} variant="body2"><b>Comment: </b>{review.userComment}</Typography>
        </Box>
    );
}

export default UserReviews;