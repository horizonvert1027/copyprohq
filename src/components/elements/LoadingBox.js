import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBox = ({loading}) => {
    return (
        <Box
            sx= {{ 
              color: 'red', 
              position: 'absolute', 
              width: '95%', 
              height:'50%',
              zIndex: (theme) => theme.zIndex.drawer + 1 }}
              display={loading ?'block':'none'}
        > 
          <Box
            sx={{
              position:'relative',
              width:'100%',
              height:'100%'
            }}
          >
            <CircularProgress 
              color="inherit"
              sx={{
                position:'absolute',
                left:'50%',
                top:'50%',
                transform:"translate(-50%, -50%)"
              }}
            />
          </Box>
        </Box>
    );
}

export default LoadingBox;