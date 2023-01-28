import { useEffect, useState } from 'react';
import { Avatar, Box, Rating, Stack, Grid, Typography } from '@mui/material';
import EditReview from './EditReview';
import DeleteReview from './DeleteReview';

function UserReviews({reviews, review, setReviews}) {
    const [containsProfilePicture, setContainsProfilePicture] = useState(false);

    useEffect(() => {
        if(review.profile_picture !== "") {
            setContainsProfilePicture(true);
        }
    }, [review]);

    return (
        <Box sx={{ mx: 1.25, textAlign: "left" }}>
            <Stack sx={{ mt: 1.5, mb: 1.3 }} direction="row" alignItems="center" spacing={1.25}>
                <Grid>
                    {containsProfilePicture ? (
                        <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }} src={"http://localhost:8000/media/" + review.profile_picture} alt={review.username}>{review.username.charAt(0)}</Avatar>
                    ) : (
                        <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }}>{review.username.charAt(0)}</Avatar>
                    )}
                </Grid>
                <Grid>
                    <Typography variant="body2"><b>{review.username}</b></Typography>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <EditReview reviews={reviews} review={review} setReviews={setReviews}/>
                    <DeleteReview reviews={reviews} review={review} setReviews={setReviews}/>
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