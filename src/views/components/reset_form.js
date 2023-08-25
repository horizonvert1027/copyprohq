import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import {API_BASE_URL} from '../../config';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import CustomTextField from '../../components/form/CustomTextField';
import SnackAlert from '../../components/elements/SnackAlert';
import { UserRole } from '../../components/constant/constant';

const ResetForm = ({email}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const handleChange = (e, type) => {
        switch(type) {
            case "password" :
                return setPassword(e.target.value);
            case 'confirm':
                return setConfirm(e.target.value);
            default:
                break;
        }
    }

    const handleFormSubmit = () => {
        if ( isLoading ) return ;
        setIsLoading(true);
        if ( password !== confirm ) {
            setMessage('Confirm password has to same with password');
            setSeverity('error');
            setAlertOpen(true);
            return ;
        }
        fetch(`${API_BASE_URL}/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid Link');
                }
                return response.json();
            })
            .then((data) => {
                if ( data.messages ) {
                    setMessage(data.messages);
                    setSeverity('success');
                    setAlertOpen(true);
                    window.location.href = '/login';
                } else {
                    setMessage(data.detail);
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
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField
                    type="password"
                    id="password"
                    fullWidth
                    value={password}
                    onChange={(e) =>handleChange(e, 'password')}
                />
                <CustomFormLabel htmlFor="confirm">Confirm</CustomFormLabel>
                <CustomTextField
                    type="password"
                    id="confirm"
                    fullWidth
                    value={confirm}
                    onChange={(e) =>handleChange(e, 'confirm')}
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

export default ResetForm;