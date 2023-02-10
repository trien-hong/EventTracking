import { Alert, AlertTitle, IconButton, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AlertMessage({setOpenAlert, severity, alertTitle, messages}) {
    return (
        <div>
            <Alert severity={severity} action={<Tooltip title="Close"><IconButton color="inherit" size="small" onClick={() => { setOpenAlert(false); }}><CloseIcon fontSize="inherit"/></IconButton></Tooltip>}sx={{ mb: 2 }}>
                <AlertTitle><u><b>{alertTitle}</b></u></AlertTitle>
                <Typography variant="body1">
                    {messages}
                </Typography>
            </Alert>
        </div>
    );
}

export default AlertMessage;