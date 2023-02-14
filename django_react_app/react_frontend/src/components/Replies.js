import { useState, useContext } from 'react';
import { Avatar, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Typography } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import ReplyIcon from '@mui/icons-material/Reply';
import UserAuthContext from '../contexts/UserAuthContext';
import EditReply from './EditReply';
import DeleteReply from './DeleteReply';

function Replies({review, replies, setReplies}) {
    const [message, setMessage] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openCollapse, setOpenCollapse] = useState(false);
    const [reviewsButtonIcon, setReviewsButtonIcon] = useState(<SouthIcon sx={{ mr: 1 }}/>);
    const [reviewsButtonName, setReviewsButtonName] = useState("VIEW REPLIES");
    const [reply, setReply] = useState("");
    const {user, authTokens} = useContext(UserAuthContext);

    async function addReply(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/user/replies/`, {
        const response = await fetch(`http://127.0.0.1/api/user/replies/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                review_id: review.id,
                reply: reply
            })
        });
        if (response.status === 201) {
            const data = await response.json();
            var copy_replies = replies;
            copy_replies.push(data);
            setReplies(copy_replies);
            setOpenDialog(false);
            setMessage(null);
        }
    }

    function handleOpenCollapse() {
        if (openCollapse === false && replies == false) {
            setReviewsButtonName("HIDE REPLIES");
            setReviewsButtonIcon(<NorthIcon sx={{ mr: 1 }}/>);
            setOpenCollapse(true);
            setMessage(
                <Grid sx={{ mt: 1.5 }} textAlign="center">
                    <Typography variant="body1" id="generalContainer">There are no replies for this review yet.<br></br>Be the first!</Typography>
                </Grid>
            );
        } else if (openCollapse === false) {
            setReviewsButtonName("HIDE REPLIES");
            setReviewsButtonIcon(<NorthIcon sx={{ mr: 1 }}/>);
            setOpenCollapse(true);
        } else {
            setReviewsButtonName("VIEW REPLIES");
            setReviewsButtonIcon(<SouthIcon sx={{ mr: 1 }}/>);
            setOpenCollapse(false);
        }
    }

    function handleOpenDialog() {
        setReply("");
        setOpenDialog(true);
    }

    function handleCancelDialog() {
        setReply("");
        setOpenDialog(false);
    }

    function changeReply(e) {
        setReply(e.target.value);
    }

    return (
        <div>
            <Stack sx={{ mt: 1 }} direction="row">
                <Grid container justifyContent="flex-start">
                    <Button sx={{ backgroundColor: "white", ":hover": { bgcolor: "primary.main", color: "white" } }} variant="outlined" onClick={() => { handleOpenCollapse(); }}>{reviewsButtonIcon}{reviewsButtonName}</Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Button sx={{ backgroundColor: "white", ":hover": { bgcolor: "primary.main", color: "white" } }} variant="outlined" onClick={() => { handleOpenDialog(); }}><ReplyIcon sx={{ mr: 1 }}/>ADD REPLY</Button>
                </Grid>
            </Stack>
            <Collapse sx={{ mb: 1.5 }} in={openCollapse}>
                {replies.map((reply, i) =>
                    <div key={i}>
                        {(() => {
                            console.log(reply);
                            if (reply.username !== user.username) {
                                return (
                                    <Grid sx={{ mt: 1.5 }} style={{ width: "100%" }} id="generalContainer">
                                        <Stack sx={{ mt: 0.5, mb: 1.3 }} direction="row" alignItems="center" spacing={1.25}>
                                            <Grid>
                                                <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }} src={"http://localhost:8000/media/" + reply.profile_picture} alt={reply.username}>{reply.username.charAt(0)}</Avatar>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="body1"><b>{reply.username}</b></Typography>
                                            </Grid>
                                        </Stack>
                                        <Divider sx={{ backgroundColor: "gray" }}/>
                                        <Typography sx={{ mt: 1 }} variant="body2"><b>Replied On:</b> {reply.date}</Typography>
                                        <Typography variant="body2"><b>Reply:</b> {reply.reply}</Typography>
                                    </Grid>
                                );
                            } else {
                                return (
                                    <Grid sx={{ mt: 1.5 }} style={{ width: "100%" }} id="generalContainer">
                                        <Stack sx={{ mt: 0.5, mb: 1.3 }} direction="row" alignItems="center" spacing={1.25}>
                                            <Grid>
                                                <Avatar sx={{ height: "60px", width: "60px", borderStyle: "solid", borderColor: "gray", borderWidth: "1px" }} src={"http://localhost:8000/media/" + reply.profile_picture} alt={reply.username}>{reply.username.charAt(0)}</Avatar>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="body1"><b>{reply.username}</b></Typography>
                                            </Grid>
                                            <Grid container justifyContent="flex-end">
                                                <EditReply reply={reply} replies={replies} setReplies={setReplies}/>
                                                <DeleteReply reply={reply} replies={replies} setReplies={setReplies} setMessage={setMessage}/>
                                            </Grid>
                                        </Stack>
                                        <Divider sx={{ backgroundColor: "gray" }}/>
                                        { reply.isEdited ? (
                                            <Typography sx={{ mt: 1 }} variant="body2"><b>Last Edited Reply On:</b> {reply.date}</Typography>
                                        ) : (
                                            <Typography sx={{ mt: 1 }} variant="body2"><b>Replied On:</b> {reply.date}</Typography>
                                        )}
                                        <Typography variant="body2"><b>Reply:</b> {reply.reply}</Typography>
                                    </Grid>
                                );
                            }
                        })()}
                    </div>
                )}
                {message}
            </Collapse>
            <Dialog open={openDialog} onClose={() => { handleCancelDialog(); }}>
                <Grid sx={{ width: "500px" }}>
                    <DialogTitle align="center"><b><u>Add Reply</u></b></DialogTitle>
                    <DialogContent>
                        <form onSubmit={addReply}>
                            <Textarea sx={{ mt: 2, background: "white" }} minRows={4} maxRows={4} placeholder="Add your reply here..." value={reply} onChange={changeReply} endDecorator={ <Typography level="body3" sx={{ ml: 'auto' }} variant="body1"><b><u>{reply.length}</u> character(s)</b></Typography> } inputprops={{ maxLength: 12 }} required/>
                            <Grid sx={{ mt: 2 }} textAlign="right">
                                <Button type="submit" variant="contained"><ReplyIcon sx={{ mr: 1 }}/>REPLY</Button>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => { handleCancelDialog() }}>CANCEL</Button>
                    </DialogActions>
                </Grid>
            </Dialog>
        </div>
    );
}

export default Replies;