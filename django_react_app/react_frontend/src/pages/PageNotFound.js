import { useEffect } from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function PageNotFound() {
    useEffect(() => {
        document.title = "Error | 404 - Page Not Found";
    }, []);

    return (
        <div>
            <center>
                <ErrorOutlineIcon sx={{ mt: 5, mb: 5 }} id="errorIcon"/>
            </center>
            <Typography id="errors" variant="h5" align="center">Sorry, the page you were looking for does not exist.</Typography>
        </div>
    );
}

export default PageNotFound;