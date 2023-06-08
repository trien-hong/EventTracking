import { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Tooltip, Typography } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import UpdateIcon from '@mui/icons-material/Update';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UserAuthContext from '../contexts/UserAuthContext';

function EditReply({reply, replies, setReplies}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [editedReply, setEditedReply] = useState(reply.reply);
    const {authTokens} = useContext(UserAuthContext);

    async function editReply(e) {
        e.preventDefault();
        // const response = await fetch(`http://127.0.0.1:8000/api/user/replies/`, {
        const response = await fetch(`http://127.0.0.1/api/user/replies/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                reply_id: reply.id,
                editedReply: editedReply
            })
        });
        if (response.status === 200) {
            const data = await response.json();
            const editiedReply = replies.map((obj) => {
                if (obj.id === reply.id) {
                    const update = ({...obj});
                    update["date"] = data.date;
                    update["reply"] = data.reply;
                    update["isEdited"] = data.isEdited;
                    return update;
                }
                return obj;
            });
            setReplies(editiedReply);
            alert("Reply has been successfully updated/edited for this user's review.");
            setOpenDialog(false);
        } else {
            alert("There seems to be an issue in updating/editing your reply.");
        }
    }

    function handleOpenDialog() {
        setEditedReply(reply.reply);
        setOpenDialog(true);
    }

    function handleCancelDialog() {
        setEditedReply(reply.reply);
        setOpenDialog(false);
    }

    function changeReply(e) {
        setEditedReply(e.target.value);
    }

    return (
        <div>
            <Tooltip title="Edit Reply">
                <ModeEditIcon id="userReviewIcon" onClick={() => { handleOpenDialog(); }}/>
            </Tooltip>
            <Dialog open={openDialog} onClose={() => { handleCancelDialog(); }}>
                <Grid sx={{ width: "500px" }}>
                    <DialogTitle align="center"><b><u>Add Reply</u></b></DialogTitle>
                    <DialogContent>
                        <form onSubmit={editReply}>
                            <Textarea sx={{ mt: 2, background: "white" }} minRows={4} maxRows={4} placeholder="Edit your reply here..." value={editedReply} onChange={changeReply} endDecorator={ <Typography level="body3" sx={{ ml: 'auto' }} variant="body1"><b><u>{editedReply.length}</u> character(s)</b></Typography> } inputprops={{ maxLength: 12 }} required/>
                            <Grid sx={{ mt: 2 }} textAlign="right">
                                <Button type="submit" variant="contained"><UpdateIcon sx={{ mr: 1 }}/>UPDATE REPLY</Button>
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

export default EditReply;