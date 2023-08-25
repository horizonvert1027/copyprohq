import { useState } from 'react';
import { Link } from 'react-router-dom';

import {API_BASE_URL} from '../../config';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import CustomTextField from '../../components/form/CustomTextField';
import { Button, Divider, Grid } from '@mui/material';
import SnackAlert from '../../components/elements/SnackAlert';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const handleAlertClose = () => {
        setAlertOpen(false);
    }
    const handleFormSubmit = () => {
        if ( isLoading ) return ;
        setIsLoading(true);

        fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                company: company,
                contact_no: contactNo
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
                    setMessage('Registerd Successfully, please login!');
                    setSeverity('success');
                    setAlertOpen(true);
                    window.location.href='/login'
                } else {
                    setMessage(data.messages);
                    setSeverity('error');
                    setAlertOpen(true);
                    return ;
                }
            })
            .catch((error) => {
                setMessage(error.detail);
                setSeverity('error');
                setAlertOpen(true);
            }).finally(() => {
                setIsLoading(false); // Stop loading spinner
            });
    };

    const handleChange = (e, type) => {
        switch (type) {
            case 'name':
                return setName(e.target.value);
            case 'email':
                return setEmail(e.target.value);
            case 'company':
                return setCompany(e.target.value);
            case 'contact' :
                return setContactNo(e.target.value);
            case 'password':
                return setPassword(e.target.value);
            default:
                break;
        }
    }

    return (
        <div>
            <SnackAlert open={alertOpen} severity={severity} handleClose={handleAlertClose} message={message}/>
            <div className="form-control w-full ">
                <CustomFormLabel htmlFor = "name">
                    Name
                </CustomFormLabel>
                <CustomTextField
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => handleChange(e,'name')}
                    fullWidth
                />
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <CustomTextField
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => handleChange(e,'email')}
                    fullWidth
                />
                <Grid container spacing={2}>
                    <Grid item sm={12} md={6} width={'100%'}>
                        <CustomFormLabel htmlFor='company'>Company</CustomFormLabel>
                        <CustomTextField
                            type="text"
                            id="company"
                            value={company}
                            onChange={(e) => handleChange(e,'company')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} md={6} width={'100%'}>
                        <CustomFormLabel htmlFor="contact">Phone Number:</CustomFormLabel>
                        <CustomTextField
                            type="text"
                            id="contact"
                            value={contactNo}
                            onChange={(e) => handleChange(e,'contact')}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                
                <CustomFormLabel htmlFor='password'>Password</CustomFormLabel>
                <CustomTextField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => handleChange(e,'password')}
                    fullWidth
                />
                <Divider sx={{mt:2}}/>
                <Button variant='contained' color='success' fullWidth onClick={handleFormSubmit}>
                    {isLoading ? '...' : 'Sign Up'}
                </Button>
            </div>
            <p className="mt-5 text-txt-blue-grey">
                Do you have an account already?{' '}&nbsp;&nbsp;
                <Link to="/login" className="text-main-accent">
                    <span style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#2e7d32'
                    }}>LOGIN</span>
                </Link>
            </p>
        </div>
    );
};

export default SignupForm;