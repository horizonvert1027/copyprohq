
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackAlert = ({open,severity, message, handleClose}) => {
    return (
        <Snackbar elevation={6} anchorOrigin={{ vertical:'top', horizontal:'right' }} variant="filled" open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

export default SnackAlert;