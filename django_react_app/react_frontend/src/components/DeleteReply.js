import { useContext } from 'react';
import { Grid, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAuthContext from '../contexts/UserAuthContext';

function DeleteReply({reply, replies, setReplies, setMessage}) {
    const {authTokens} = useContext(UserAuthContext);

    async function deleteReply() {
        // const response = await fetch(`http://127.0.0.1:8000/api/user/replies/`, {
        const response = await fetch(`http://127.0.0.1/api/user/replies/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                reply_id: reply.id,
            })
        });
        if (response.status === 200) {
            setReplies((replies) => replies.filter((replies) => replies !== reply));
            if (replies.length - 1 === 0) {
                setMessage(
                    <Grid sx={{ mt: 1.5 }} textAlign="center">
                        <Typography variant="body1" id="generalContainer">There are no replies for this review yet.<br></br>Be the first!</Typography>
                    </Grid>
                );
            }
            alert("Reply has been successfully deleted from this user's review.");
        } else {
            alert("There seems to be an issue in deleting your reply.");
        }
    }

    return (
        <div>
            <Tooltip title="Delete Reply">
                <DeleteIcon sx={{ ml: 0.5 }} id="userReviewIcon" onClick={() => { deleteReply(); }}/>
            </Tooltip>
        </div>
    );
}

export default DeleteReply;