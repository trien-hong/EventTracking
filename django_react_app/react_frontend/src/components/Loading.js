import { Typography, CircularProgress } from '@mui/material';

function Loading() {
    return (
        <div>
            <center>
                <Typography sx={{ my: 3 }} variant="h5">Loading...</Typography>
            </center>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress/>
            </div>
        </div>
    )
}

export default Loading;