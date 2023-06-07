import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

function PageNotFound() {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Error | 404 - Page Not Found";
        const time = 1000
        const interval = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress >= 100) {
                goToEvents();
                return 0;
            }
            return (oldProgress + 10);
            });
        }, time);
        return (() => clearInterval(interval));
    }, []);

    function goToEvents() {
        navigate(`/events/`);
    }

    return (
        <Grid sx={{ mt: 2 }} container justifyContent="center" textAlign="center">
            <div id="generalContainer">
                <Typography id="errors" variant="h5" align="center">Sorry, the page you were looking for does not exist.<br></br>You'll automatically be redirected shortly.</Typography>
                <Divider sx={{ mt: 2, "&::before, &::after": { borderColor: "gray" } }}><Chip style={{ fontSize: "23px" }} color="error" label="ERROR | 404" icon={ <ErrorIcon/> }/></Divider>
                <LinearProgress sx={{ mt: 2 }} color="error" variant="determinate" value={progress}/>
            </div>
        </Grid>
    );
}

export default PageNotFound;