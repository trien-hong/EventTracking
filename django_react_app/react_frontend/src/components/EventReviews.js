import { useEffect, useState, useContext } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Rating, Select, Typography } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import RateReviewIcon from '@mui/icons-material/RateReview';
import UserAuthContext from '../contexts/UserAuthContext';
import OtherUsersReviews from './OtherUsersReviews';
import MyReviews from './MyReviews';
import Loading from './Loading';

function EventReviews({event}) {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const {user, authTokens} = useContext(UserAuthContext);
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
        if (response.status === 200) {
            const data = await response.json();
            setReviews(data);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    async function addReview(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/user/reviews/`, {
        const response = await fetch(`http://127.0.0.1/api/user/reviews/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                event_id: event.event_id,
                title: event.title,
                userComment: comment,
                userRating: rating,
            })
        });
        if (response.status === 201) {
            alert("Review has been added to this event.");
            getEventReviews();
        } else {
            alert("There seems to be an issue adding your review for this event.")
        }
    }

    function changeComment(e) {
        setComment(e.target.value);
    }

    function changeRating(e) {
        setRating(e.target.value);
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
                        <Textarea sx={{ mt: 2, background: "white" }} minRows={4} maxRows={4} variant="outlined" size="lg" placeholder="Leave your comment here..." value={comment} onChange={changeComment} endDecorator={ <Typography level="body3" sx={{ ml: 'auto' }} variant="body1"><b><u>{comment.length}</u> character(s)</b></Typography> } inputprops={{ maxLength: 12 }} required/>
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
                                                        <OtherUsersReviews review={review}/>
                                                    </div>
                                                    <br></br>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div>
                                                    <div id="review">
                                                        <MyReviews reviews={reviews} review={review} setReviews={setReviews}/>
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