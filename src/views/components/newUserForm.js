import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {API_BASE_URL} from '../../config';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import CustomTextField from '../../components/form/CustomTextField';
import CustomSelect from '../../components/form/CustomSelect';
import { Button, MenuItem } from '@mui/material';

const NewUserForm = ({onClose}) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(''); // Default role value is empty
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e, type) => {
        switch(type) {
            case 'email':
                return setEmail(e.target.value);
            case 'role':
                return setRole(e.target.value);
            default:
                break;
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        if ( isSubmitting ) return ;
        const userData = {
            email: email,
            user_type: role,
        };

        // Call the /send_invite endpoint to create user
        fetch(`${API_BASE_URL}/send_invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => response.json())
            .then((data) => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                setEmail('');
                setRole('');
                onClose();
                window.location.reload();
                // Perform any necessary actions after user creation
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                setIsSubmitting(false);
            });
    };
    const handleClose = () => {
        onClose();
    }
    return (
        <Box style={{ minWidth: '300px' }}>
                <h2 className="text-2xl font-bold mb-4">Create New User</h2>

                <Box className="mb-4">
                    <CustomFormLabel htmlFor="email">
                        Email:
                    </CustomFormLabel>
                    <CustomTextField
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </Box>

                <Box className="mb-4">
                    <CustomFormLabel htmlFor="role">
                        Role:
                    </CustomFormLabel>
                    <CustomSelect
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => handleInputChange(e,'role')}
                        fullWidth
                    >
                        <MenuItem value=''>Select Role</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="manager">Manager</MenuItem>
                    </CustomSelect>
                </Box>
                <Box sx={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    gap:3,
                    mt:4
                }}>
                    <Button color='error' onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? (
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress size={20} color="inherit" />
                            </Box>
                        ) : (
                            'Submit'
                        )}

                    </Button>
                </Box>

                {isSubmitted && <p>User created successfully.</p>}
        </Box>
    );
};

export default NewUserForm;
