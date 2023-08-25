import { Alert, Box, Button, Divider, Typography  } from "@mui/material";
import { useState } from "react";
import CustomTextField from "../../components/form/CustomTextField";
import CustomFormLabel from "../../components/form/CustomFormLabel";
import {API_BASE_URL} from "../../config";
import { UserRole } from "../../components/constant/constant";

const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if ( isLoading ) return ;
        setIsLoading(true);
        setErrorMessage('');
        fetch(`${API_BASE_URL}/admin_login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then((response) => {
                return response.json();
            })
            .then((data) => {
                if ( data.detail ) {
                    return setErrorMessage(data.detail);
                }
                window.sessionStorage.setItem(UserRole.SUPERADMIN, JSON.stringify(data));
                window.location.href="/admin/"
            })
            .catch((error) => {
                setErrorMessage(error.detail);
                // Handle login error (e.g., display error message)
            }).finally(() => {
                setIsLoading(false); // Stop loading spinner
            });
    };
    const handleChange = (event, type) => {
        switch(type) {
            case 'email':
                return setEmail(event.target.value);
            case 'password':
                return setPassword(event.target.value);
            default:
                break;
        }
    };

    return (
        <Box>
            {errorMessage && <Alert severity={'error'}>{errorMessage}</Alert>}
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
                type="text"
                id="email"
                value={email}
                onChange={(event) => handleChange(event,'email')}
                fullWidth
                required
            />
            <CustomFormLabel htmlFor='password'>Password</CustomFormLabel>
            <CustomTextField 
                type="password"
                id="password"
                onChange={(event) => handleChange(event, 'password')}
                fullWidth
                required
            />
            <Divider sx={{
                mt:2
            }}/>
            <Button onClick={handleFormSubmit} sx={{
                ":hover":{
                    background:'#efefef',
                    color:'#1e40af'
                },
                background:'#1e40af',
                color:'#ffffff'
            }} fullWidth>{isLoading ? 'Logging in...' : 'Log in'}</Button>
        </Box>
    );
}

export default AdminLoginForm;