import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ForgetForm from '../components/forget_form';
const ForgotPassword = () => {
    return (
        <div className="h-screen grid grid-cols-2">
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
                    Forgot your password?
                </Typography>
                <Typography variant='p'>
                    Please enter the email address associated with your account and We will email you a link to reset your password.
                </Typography>
                <Box>
                    <ForgetForm />
                </Box>
            </div>
        </div>
    );
};

export default ForgotPassword;