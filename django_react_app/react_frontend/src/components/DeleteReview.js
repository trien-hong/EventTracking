import { useContext } from 'react';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserAuthContext from '../contexts/UserAuthContext';

function DeleteReview({reviews, review, setReviews}) {
    const {authTokens} = useContext(UserAuthContext);

    async function deleteReview() {
        setReviews((reviews) => reviews.filter((reviews) => reviews !== review));
        if (reviews.length - 1 === 0) {
            setReviews(null);
        }
        // const response = await fetch(`http://127.0.0.1:8000/api/user/reviews/`, {
        const response = await fetch(`http://127.0.0.1/api/user/reviews/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + String(authTokens.access)
            },
            body: JSON.stringify({
                review_id: review.id,
            })
        });
        if (response.status === 200) {
            alert("Review has been successfully deleted from this event.");
        } else {
            alert("There seems to be an issue in deleting your review.");
        }
    }

    return (
        <div>
            <Tooltip title="Delete Review">
                <DeleteIcon sx={{ ml: 0.5 }} id="userReviewIcon" onClick={() => { deleteReview(); }}/>
            </Tooltip>
        </div>
    );
}

export default DeleteReview;