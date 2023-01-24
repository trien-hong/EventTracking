import { useEffect, useState, useContext } from 'react';
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Rating, Stack, Grid, Select, Tooltip, Typography } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import UserAuthContext from '../contexts/UserAuthContext';
import ProfilePictureContext from '../contexts/ProfilePictureContext';
import EditReview from './EditReview';
import Loading from './Loading';

function EventReviews({event}) {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const {user, authTokens} = useContext(UserAuthContext);
    const {profilePictureLocation} = useContext(ProfilePictureContext);

    useEffect(() => {
        if (event !== undefined) {
            getEventReviews();
        }
    }, [event]);

    async function getEventReviews() {
        // const response = await fetch(`http://127.0.0.1:8000/api/reviews/get/event_id/${event.event_id}/`, {
        const response = await fetch(`http://127.0.0.1/api/reviews/get/event_id/${event.event_id}/`, {
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

    async function addReview(e) {
        e.preventDefault();
        // await fetch(`http://127.0.0.1:8000/api/user/reviews/`, {
        await fetch(`http://127.0.0.1/api/user/reviews/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                event_id: event.event_id,
                title: event.title,
                userRating: rating,
                userComment: comment,
                profilePictureLocation: profilePictureLocation
            })
        });
        getEventReviews();
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
        setReviews(null); // Not idea. Will need to fix later.
        getEventReviews();
    }

    function changeRating(e) {
        setRating(e.target.value);
    }

    function changeComment(e) {
        setComment(e.target.value);
    }

    return (
        <div>
            {isLoading ? (
                <div>
                    <Loading/>
                </div>
            ) : (
                <div>
                    <Typography sx={{ my: 2 }} variant="h4"><b>Add Your Review</b></Typography>
                    <Typography variant="h6"><b>Event Title:</b> <i>{event.title}</i></Typography>
                    <form onSubmit={addReview}>
                        <Textarea sx={{ mt: 2, background: "white" }} minRows={4} maxRows={4} placeholder="Leave your comment here..." value={comment} onChange={changeComment} endDecorator={ <Typography level="body3" sx={{ ml: 'auto' }} variant="body1"><b><u>{comment.length}</u> character(s)</b></Typography> } inputprops={{ maxLength: 12 }} required/>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FormControl sx={{ my: 2.5, minWidth: 175 }} variant="filled">
                                <InputLabel>Rating</InputLabel>
                                <Select sx={{ background: "white" }} value={rating} onChange={changeRating} required>
                                    <MenuItem value={"Update Later"}>Update Later</MenuItem>
                                    <MenuItem value={"1"}>1 | (Appaling)</MenuItem>
                                    <MenuItem value={"2"}>2 | (Very Bad)</MenuItem>
                                    <MenuItem value={"3"}>3 | (Average)</MenuItem>
                                    <MenuItem value={"4"}>4 | (Very Good)</MenuItem>
                                    <MenuItem value={"5"}>5 | (Masterpiece)</MenuItem>
                                </Select>
                            </FormControl>
                            <Rating sx={{ mx: 4, fontSize: "1.70rem" }} value={parseInt(rating)} readOnly/>
                            <Button type="submit" variant="contained">SUBMIT &nbsp;<RateReviewIcon/></Button>
                        </Box>
                    </form>
                    <hr></hr>
                    {reviews ? (
                        <div id="reviews">
                            <Typography sx={{ my: 2 }} variant="h4">Reviews</Typography>
                            {reviews.map((review, i) =>
                                <div key={i}>
                                    {(() => {
                                        if (review.username !== user.username) {
                                            return (
                                                <div>
                                                    <div id="review">
                                                        <Box sx={{ mx: 1.25, textAlign: "left" }}>
                                                            <Stack sx={{ mt: 1.5, mb: 1.3 }} direction="row" alignItems="center" spacing={1.25}>
                                                                <Grid>
                                                                    <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }} src={"http://localhost:8000" + review.profilePictureLocation} alt={review.username}>{review.username.charAt(0)}</Avatar>
                                                                </Grid>
                                                                <Grid>
                                                                    <Typography variant="body2"><b>{review.username}</b></Typography>
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
                                                    </div>
                                                    <br></br>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div>
                                                    <div id="review">
                                                        <Box sx={{ mx: 1.25, textAlign: "left" }}>
                                                            <Stack sx={{ mt: 1.5, mb: 1.3 }} direction="row" alignItems="center" spacing={1.25}>
                                                                <Grid>
                                                                    <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }} src={"http://localhost:8000" + profilePictureLocation.profile_picture} alt={user.username}>{review.username.charAt(0)}</Avatar>
                                                                </Grid>
                                                                <Grid>
                                                                    <Typography variant="body2"><b>{review.username}</b></Typography>
                                                                </Grid>
                                                                <Grid container justifyContent="flex-end">
                                                                    <EditReview review={review} setReviews={setReviews}/>
                                                                    <Tooltip title="Delete Review">
                                                                        <DeleteIcon sx={{ ml: 0.5 }} id="userReviewIcon" onClick={() => { deleteReview(review.id); }}/>
                                                                    </Tooltip>
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
                                                    </div>
                                                    <br></br>
                                                </div>
                                            )
                                        }
                                    })()}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <Typography sx={{ mt: 2 }} id="errors" variant="h6">There's no reviews for this specific event yet. <br></br>Be the first!</Typography>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default EventReviews;