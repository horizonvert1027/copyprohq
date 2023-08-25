import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useParams} from "react-router-dom";
import ResetForm from './../components/reset_form';
import SnackAlert from '../../components/elements/SnackAlert';

const ResetPassword = () => {
    const {id} = useParams();
    const [temp, setTemp] = useState('');
    const [email, setEmail] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    useEffect(() => {
        setTemp(id);
    })
    useEffect(() => {
        if ( temp ){
            const data = JSON.parse(atob(temp))
            if ( data.time < Date.now()/1000 ) {
                setMessage('Invalid Link');
                setSeverity('error');
                setAlertOpen(true);
                window.location.href= '/login';
            }
            setEmail(data.email);
        }
    },[temp]);
    const handleAlertClose = () => {
        setAlertOpen(false);
    }
    
    return (
        <div className="h-screen grid grid-cols-2">
            <SnackAlert open={alertOpen} severity={severity} handleClose={handleAlertClose} message={message}/>
            <div className="bg-blue-800 flex">
                <div className="m-auto text-center">
                    {/* <img className="m-auto" src={searchingSVG} /> */}
                    <h1 className="text-white font-bold text-4xl my-8">
                        ComplaintFix
                    </h1>
                    <p className="text-[#8BA3F8]">
                        At The Speed of Thought
                    </p>
                </div>
            </div>
            <div
                className="place-items-center m-auto px-16"
                style={{ width: '100%' }}>
                {/* <h1 className="text-black-200 font-bold text-4xl mb-5">Hello!</h1> */}
                <Typography variant="h4">
                    Reset Password
                </Typography>
                <Typography variant='p'>
                    Please enter the new password.
                </Typography>
                <Box>
                    <ResetForm email={email}/>
                </Box>
            </div>
        </div>
    );
};

export default ResetPassword;