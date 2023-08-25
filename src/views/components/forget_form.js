import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { APP_URL, API_BASE_URL } from '../../config';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import CustomTextField from '../../components/form/CustomTextField';
import SnackAlert from '../../components/elements/SnackAlert';
import { UserRole } from '../../components/constant/constant';

const ForgetForm = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');

    const handleChange = (e, type) => {
        switch(type) {
            case "email" :
                return setEmail(e.target.value);
            default:
                break;
        }
    }

    const handleFormSubmit = () => {
        if ( isLoading ) return ;
        setIsLoading(true);
        const temp = {
            email: email,
            time: Date.now()/1000 + 300
        }
        const forgetLink = `${APP_URL}/reset/${btoa(JSON.stringify(temp))}`;
        fetch(`${API_BASE_URL}/forget`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                link: forgetLink
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }
                return response.json();
            })
            .then((data) => {
                if ( !data.messages ) {
                    setMessage('You are logined, please wait...');
                    setSeverity('success');
                    setAlertOpen(true);
                    window.sessionStorage.setItem(UserRole.USER, JSON.stringify(data));
                    window.location.href = '/';
                } else {
                    setMessage(data.messages);
                    setSeverity('error');
                    setAlertOpen(true);
                    return null;
                }
            })
            .catch((error) => {
                console.error(error.message);
            }).finally(() => {
                setIsLoading(false); // Stop loading spinner
            });
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    }

    return (
        <Box>
            <SnackAlert open={alertOpen} severity={severity} handleClose={handleAlertClose} message={message}/>
            <div className="form-control w-full ">
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <CustomTextField
                    type="email"
                    id="email"
                    fullWidth
                    value={email}
                    onChange={(e) =>handleChange(e, 'email')}
                />
                <Divider sx={{mt:4}}/>
                <Button variant='contained' color='success' fullWidth onClick={handleFormSubmit}>
                    {isLoading ? '...' : 'Forgot Password'}
                </Button>
                <Button color='secondary' fullWidth href='/login' sx={{
                    mt:2
                }}>
                    {'Back to Login'}
                </Button>
            </div>
        </Box>
    );
};

export default ForgetForm;