import { useEffect, useState, useContext } from 'react';
import { Button, Typography, Box, Select, MenuItem, InputLabel, FormControl, Menu, Rating, IconButton, Tooltip } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserAuthContext from '../contexts/UserAuthContext';
import Loading from './Loading';

function UsersReviews({event}) {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState(null);
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const {authTokens} = useContext(UserAuthContext);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (event !== undefined) {
            getReviews();
        }
    }, [event]);

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
                userRating: rating,
                userComment: comment
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
        setIsLoading(false);
    }

    function changeRating(e) {
        setRating(e.target.value);
    }

    function changeComment(e) {
        setComment(e.target.value);
    }
    
    function handleClick(e) {
        setAnchorEl(e.currentTarget);
    };
  
    function handleClose() {
        setAnchorEl(null);
    };

    function deleteReview(e) {
        setAnchorEl(null);
    }

    function editReview(e) {
        setAnchorEl(null);
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
                    <form onSubmit={addReview}>
                        <Typography variant="h6"><b>Event Title:</b> <i>{event.title}</i></Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FormControl sx={{ my: 2, mr: 3, minWidth: 175 }} variant="filled">
                                <InputLabel>Rating</InputLabel>
                                <Select sx={{ background: "white" }} value={rating} onChange={changeRating} required>
                                    <MenuItem value={"Update Later"}>Update Later</MenuItem>
                                    <MenuItem value={"1"}>1 | (Appaling)</MenuItem>
                                    <MenuItem value={"2"}>2 | (Very Bad)</MenuItem>
                                    <MenuItem value={"3"}>3 | (Average)</MenuItem>
                                    <MenuItem value={"5"}>5 | (Masterpiece)</MenuItem>
                                    <MenuItem value={"4"}>4 | (Very Good)</MenuItem>
                                </Select>
                            </FormControl>
                            <Rating value={rating} readOnly/>
                        </Box>
                        <Textarea sx={{ background: "white" }} minRows={4} maxRows={4} placeholder="Leave your comment here..." value={comment} onChange={changeComment} endDecorator={ <Typography level="body3" sx={{ ml: 'auto' }}> {comment.length} character(s)</Typography>} inputprops={{ maxLength: 12 }} required/>
                        <Button sx={{ mt: 2, mb: 3 }} type="submit" variant="contained">SUBMIT</Button>
                    </form>
                    <hr></hr>
                    {reviews ? (
                        <div id="reviews">
                            <Typography sx={{ my: 2 }} variant="h4">User's Reviews</Typography>
                            {reviews.map((review, i) =>
                                <div key={i}>
                                    <div id="review">
                                        <IconButton sx={{ float: "right" }} onClick={handleClick}>
                                            <Tooltip title="More Options">
                                                <MoreVertIcon sx={{ color: "white", transform: "rotate(135deg)" }}/>
                                            </Tooltip>
                                        </IconButton>
                                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                            <MenuItem onClick={deleteReview}>Edit Review</MenuItem>
                                            <MenuItem onClick={editReview}>Delete Review</MenuItem>
                                        </Menu>
                                        <Box sx={{ ml: 1.25, textAlign: "left" }}>
                                            <Typography sx={{ mt: 1.5 }}><b>{review.userName}</b></Typography>
                                            <Typography><b>Reviewed On: </b>{review.dateAdded}</Typography>
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
                            <Typography sx={{ mt: 2 }} variant="h6">There's no reviews for this specific event yet. <br></br>Be the first!</Typography>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UsersReviews;