import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import {API_BASE_URL} from '../../config';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import CustomTextField from '../../components/form/CustomTextField';
import CustomCheckbox from '../../components/form/CustomCheckbox';
import SnackAlert from '../../components/elements/SnackAlert';
import { UserRole } from '../../components/constant/constant';
import { FormControlLabel } from '@mui/material';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember_me, setRemember_me] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');

    const handleChange = (e, type) => {
        switch(type) {
            case "email" :
                return setEmail(e.target.value);
            case 'password':
                return setPassword(e.target.value);
            case 'remember_me':
                return setRemember_me(1-e.target.value);
            default:
                break;
        }
    }

    const handleFormSubmit = () => {
        if ( isLoading ) return ;
        setIsLoading(true);

        fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
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
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => handleChange(e, 'password')}
                    fullWidth
                />
                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:"flex-end"
                }}>
                    <Box width={'100%'}>
                        <FormControlLabel
                            sx={{ mt: 1 }}
                            control={
                                <CustomCheckbox
                                name="remember_me"
                                onChange={(e) =>
                                    handleChange(e, "remember_me")
                                }
                                value={remember_me}
                                checked={remember_me ? true : false}
                                />
                            }
                        label="Remember User"
                        />
                    </Box>
                    <Box width={'50%'} pt={2}>
                        <Link to = '/forget_password'>
                            <Typography style={{
                                fontSize: '16px',
                                color: '#c14646',
                            }}>Forgot Password?</Typography>
                        </Link>
                    </Box>

                </Box>
                <Divider sx={{mt:4}}/>
                <Button variant='contained' color='success' fullWidth onClick={handleFormSubmit}>
                    {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
            </div>
            <p className="mt-5 text-txt-blue-grey">
                Dont have an account yet?{' '}&nbsp;&nbsp;
                <Link to="/signup" className="text-main-accent">
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#2e7d32'
                    }}>SIGN UP</span>
                </Link>
            </p>
        </Box>
    );
};

export default LoginForm;