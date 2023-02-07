import { Grid, CircularProgress, Typography } from '@mui/material';

function Loading() {
    return (
        <div>
            <Grid sx={{ mt: 2 }} container justifyContent="center" textAlign="center">
                <Typography sx={{ my: 3 }} variant="h5">Loading...</Typography>
            </Grid>
            <Grid container justifyContent="center" textAlign="center">
                <CircularProgress/>
            </Grid>
        </div>
    );
}

export default Loading;