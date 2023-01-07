import { Typography, CircularProgress } from '@mui/material';

function Loading() {
    return (
        <div>
            <center>
                <Typography variant="h5">Loading...</Typography>
            </center>
            <br></br>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress/>
            </div>
        </div>
    )
}

export default Loading;