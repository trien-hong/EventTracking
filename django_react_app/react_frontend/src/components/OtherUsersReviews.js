import { useEffect, useState } from 'react';
import { Avatar, Box, Divider, Grid, Rating, Stack, Typography } from '@mui/material';
import Replies from './Replies';

function OtherUsersReviews({review}) {
    const [replies, setReplies] = useState(review.replies);
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
                    <Typography variant="h6"><b>{review.username}</b></Typography>
                </Grid>
            </Stack>
            <Divider sx={{ backgroundColor: "gray" }}/>
            { review.isEdited ? (
                <Typography sx={{ mt: 1 }} variant="body1"><b>Last Edited Review On: </b>{review.date}</Typography>
            ) : (
                <Typography sx={{ mt: 1 }} variant="body1"><b>Reviewed On: </b>{review.date}</Typography>
            )}
            <Typography variant="body1"><b>Event Title: </b>{review.title}</Typography>
            <Stack alignItems="center" direction="row">
                <Typography variant="body1">
                    <b>Rating: </b>
                </Typography>
                <Rating sx={{ ml: 0.5, fontSize: 20 }} value={parseInt(review.userRating)} readOnly/>
            </Stack>
            <Typography sx={{ mb: 1.5 }} variant="body1"><b>Comment: </b>{review.userComment}</Typography>
            <Replies review={review} replies={replies} setReplies={setReplies}/>
        </Box>
    );
}

export default OtherUsersReviews;