import { useEffect, useState, useContext } from 'react';
import { Button, Typography } from '@mui/material';
import UserAuthContext from '../contexts/UserAuthContext';

function UsersReviews({event}) {
    const [value, setValue] = useState("");
    const [reviews, setReviews] = useState(null);
    const {authTokens} = useContext(UserAuthContext);

    useEffect(() => {
        setValue(event);
        getReviews();
    }, []);

    async function addReview(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/user/review/add/`, {
        const response = await fetch(`http://127.0.0.1/api/user/review/add/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                event_id: event.event_id,
                title: event.title,
                userRating: e.target.userRating.value,
                userComment: e.target.userComment.value
            })
        });
        getReviews();
    }

    async function getReviews() {
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
    }

    return (
        <div>
            <br></br>
            <Typography variant="h4"><b>Add Your Review</b></Typography>
            <br></br>
            <form onSubmit={addReview}>
                <Typography variant="h6"><b>Event Title:</b> <i>{value.title}</i></Typography>
                <Typography variant="h6"><b>Rating:</b>&nbsp;
                    <select name="userRating" required>
                        <option value="">~choose an option~</option>
                        <option value="Update Later">Update Later</option>
                        <option value="1">1 | (Appaling)</option>
                        <option value="2">2 | (Horrible)</option>
                        <option value="3">3 | (Very Bad)</option>
                        <option value="4">4 | (Bad)</option>
                        <option value="5">5 | (Fine)</option>
                        <option value="6">6 | (Average)</option>
                        <option value="7">7 | (Good)</option>
                        <option value="8">8 | (Very Good)</option>
                        <option value="9">9 | (Great)</option>
                        <option value="10">10 | (Masterpiece)</option>
                    </select>
                </Typography>
                <br></br>
                <textarea type="text" name="userComment" placeholder="Leave your comment here" rows="8" cols="50" maxLength="500" required></textarea>
                <br></br>
                <br></br>
                <Button type="submit" variant="contained">SUBMIT</Button>
                <br></br>
                <br></br>
                <hr></hr>
            </form>
            {reviews ? (
                <div id="reviews">
                    <br></br>
                    <Typography variant="h4">User's Reviews</Typography>
                    <br></br>
                    {reviews.map((review, i) =>
                        <div key={i}>
                            <div id="review">
                                <center>
                                    <br></br>
                                    <Typography><b>{review.userName}</b></Typography>
                                    <Typography><b>Reviewed On: </b>{review.dateAdded}</Typography>
                                    <Typography><b>Rating: </b>{review.userRating}/10</Typography>
                                    <Typography><b>Comment: </b>{review.userComment}</Typography>
                                    <br></br>
                                </center>
                            </div>
                            <br></br>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <br></br>
                    <Typography>There's no reviews for this specific event yet. Be the first!</Typography>
                </div>
            )}
        </div>
    );
}

export default UsersReviews;