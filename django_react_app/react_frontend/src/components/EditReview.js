import { useState, useContext } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Rating, Select, Tooltip, Typography } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import RateReviewIcon from '@mui/icons-material/RateReview';
import UserAuthContext from '../contexts/UserAuthContext';

function EditReview({review, setReviews}) {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState(review.userComment);
    const [rating, setRating] = useState(review.userRating);
    const {authTokens} = useContext(UserAuthContext);

    async function getReviews() {
        // const response = await fetch(`http://127.0.0.1:8000/api/reviews/get/event_id/${review.event_id}/`, {
        const response = await fetch(`http://127.0.0.1/api/reviews/get/event_id/${review.event_id}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
        });
        const data = await response.json();
        setReviews(data);
        setOpen(false);
    }

    async function editReview(e) {
        e.preventDefault();
        // await fetch(`http://127.0.0.1:8000/api/user/reviews/`, {
        await fetch(`http://127.0.0.1/api/user/reviews/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                id: review.id,
                event_id: review.event_id,
                title: review.title,
                userRating: rating,
                userComment: comment
            })
        });
        getReviews();
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleCancle() {
        setComment(review.userComment);
        setRating(review.userRating);
        setOpen(false);
    }

    function changeRating(e) {
        setRating(e.target.value);
    }

    function changeComment(e) {
        setComment(e.target.value);
    }

    return (
        <div>
            <Tooltip title="Edit Review">
                <ModeEditIcon id="userReviewIcon" onClick={() => { handleOpen(); }}/>
            </Tooltip>
            <Dialog open={open} onClose={() => { handleCancle(); }}>
                <DialogTitle align="center"><b><u>Edit Your Review</u></b></DialogTitle>
                <DialogContent>
                    <Typography variant="h6"><b>Event Title:</b> <i>{review.title}</i></Typography>
                    <form onSubmit={editReview}>
                        <Textarea sx={{ mt: 2, background: "white" }}  minRows={4} maxRows={4} value={comment} onChange={changeComment} endDecorator={ <Typography level="body3" sx={{ ml: 'auto' }} variant="body1"><b><u>{comment.length}</u> character(s)</b></Typography> } inputprops={{ maxLength: 12 }} required/>
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
                            <Button type="submit" variant="contained">UPDATE &nbsp;<RateReviewIcon/></Button>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleCancle() }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditReview;