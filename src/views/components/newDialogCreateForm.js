import React, { useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import {API_BASE_URL} from '../../config';
import CustomTextField from '../../components/form/CustomTextField';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import { UserRole } from '../../components/constant/constant';

const NewDialogForm = ({ editing, previousData }) => {
    const [dialogID, setDialogID] = useState((editing) ? previousData.id : 0);
    const [workflowID, setWorkflowID] = useState((editing) ? previousData.workflow_id : 0);
    const [dialogName, setDialogName] = useState((editing) ? previousData.name : "");
    const [details, setDetails] = useState((editing) ? previousData.description : "");
    const [keyValuePairs, setKeyValuePairs] = useState((editing) ? JSON.parse(previousData.values) : {});
    const [currentKey, setCurrentKey] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'key':
                return setCurrentKey(value);
            case 'value':
                return setCurrentValue(value);
            case 'dialogName':
                return setDialogName(value);
            case 'details':
                return setDetails(value);
            default:
                break;
        }
    };

    const handleAddPair = () => {
        if (currentKey && currentValue) {
            setKeyValuePairs({ ...keyValuePairs, [currentKey]: currentValue });
            setCurrentKey('');
            setCurrentValue('');
        }
    };

    const handleRemovePair = (key) => {
        const updatedPairs = { ...keyValuePairs };
        delete updatedPairs[key];
        setKeyValuePairs(updatedPairs);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        const temp = window.sessionStorage.getItem(UserRole.USER);
        if (!temp) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(temp);

        const dialogData = {
            workflow_id: workflowID, // Make sure workflowID is defined and has a valid value
            dialog_name: dialogName,
            description: details,
            values: keyValuePairs,
            settings: {}, // Set to an empty object, not an empty string
            user_id: user.user_id, // Update field name to user_id
        };
        if (editing) {

            fetch(`${API_BASE_URL}/edit_dialog/${dialogID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dialogData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Brand created successfully:', data);
                    setResponseMessage('Brand created successfully!');
                    console.log('Dialog created successfully:', data);
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    setDialogID(0);
                    setWorkflowID(0);
                    setDialogName('');
                    setDetails('');
                    setCurrentKey('');
                    setCurrentValue('');
                    setLoading(false);
                    window.location.reload();
                    // Perform any necessary actions after dialog creation
                })
                .catch((error) => {
                    console.error('Error creating brand:', error);
                    setResponseMessage('Brand creation failed!');
                    setIsSubmitting(false);
                });
        } else {
            fetch(`${API_BASE_URL}/add_dialogs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dialogData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Brand created successfully:', data);
                    setResponseMessage('Brand created successfully!');
                    console.log('Dialog created successfully:', data);
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    setDialogID(0);
                    setWorkflowID(0);
                    setDialogName('');
                    setDetails('');
                    setCurrentKey('');
                    setCurrentValue('');
                    setLoading(false);
                    window.location.reload();
                    // Perform any necessary actions after dialog creation
                })
                .catch((error) => {
                    console.error('Error creating brand:', error);
                    setResponseMessage('Brand creation failed!');
                    setIsSubmitting(false);
                });
        }
    };

    const handleClose = () => {
        setResponseMessage(null);
    };

    return (
        <Box style={{ minWidth: '300px' }} px={1}>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-200 opacity-75 flex justify-center items-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )}

            <Snackbar open={responseMessage !== null} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={responseMessage === 'Brand created successfully!' ? 'success' : 'error'}>
                    {responseMessage}
                </MuiAlert>
            </Snackbar>

            <Box>
                <Box className="mb-4">
                    <CustomFormLabel htmlFor="dialogName">
                        Dialog Name:
                    </CustomFormLabel>
                    <CustomTextField
                        type="text"
                        id="dialogName"
                        name="dialogName"
                        value={dialogName}
                        size="small"
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>

                <Box className="mb-4">
                    <CustomFormLabel htmlFor="details">
                        Description:
                    </CustomFormLabel>
                    <CustomTextField
                        type="text"
                        id="details"
                        name="details"
                        size="small"
                        value={details}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Box>

                <Box className="mb-4">
                    <CustomFormLabel>Dialog Details:</CustomFormLabel>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        gap:3
                    }}>
                        <Box sx={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'space-between',
                            gap:1,
                            width:'100%'
                        }}>
                            <CustomTextField
                                type="text"
                                name="key"
                                placeholder="Label"
                                value={currentKey}
                                size="small"
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <CustomTextField
                                type="text"
                                name="value"
                                placeholder="Data"
                                size="small"
                                value={currentValue}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                        <Button
                            onClick={handleAddPair}
                            size="small"
                            variant='contained'
                            width={'50%'}
                        >
                            Add
                        </Button>
                    </Box>

                    {Object.entries(keyValuePairs).map(([key, value]) => (
                        <Box key={key} sx={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'space-between',
                            gap:3,
                            mt:1
                        }}>
                            <Box sx={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-between',
                                gap:1,
                                width:'100%'
                            }}>
                                <CustomTextField
                                    size="small"
                                    value={key}
                                    fullWidth
                                    disabled={true}
                                />
                                <CustomTextField
                                    size='small'
                                    value={value}
                                    fullWidth
                                    disabled={true}
                                />
                            </Box>
                            <Button
                                onClick={() => handleRemovePair(key)}
                                width='50%'
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="red"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 1a9 9 0 100 18 9 9 0 000-18zM5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5H5.75A.75.75 0 015 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Button>
                        </Box>
                    ))}
                </Box>

                <Button
                    disabled={isSubmitting}
                    fullWidth
                    variant='contained'
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
        </Box>
    );
};

export default NewDialogForm;

