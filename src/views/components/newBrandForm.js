import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {API_BASE_URL} from '../../config';
import { Alert, Box, Button } from '@mui/material';
import CustomTextField from '../../components/form/CustomTextField';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import { UserRole } from '../../components/constant/constant';
import { Typography } from 'tabler-icons-react';

const BrandForm = ({ editing, brand }) => {
    const [brandID, setBrandID] = useState((editing) ? brand.id : 0);
    const [brandName, setbrandName] = useState((editing) ? brand.name : '');
    const [details, setDetails] = useState((editing) ? brand.description : '');
    const [keyValuePairs, setKeyValuePairs] = useState((editing && brand.values != null) ? JSON.parse(brand.values) : {});
    const [currentKey, setCurrentKey] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    const [brandError, setBrandError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'key') {
            setCurrentKey(value);
        } else if (name === 'value') {
            setCurrentValue(value);
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
        const temp = window.sessionStorage.getItem(UserRole.USER);
        if (!temp) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(temp);
        setBrandError('');
        if ( brandName.trim().length == 0 ){
            setBrandError('Brand Name is required');
            return ;
        }
        const editingbrandData = {
            brand_id: brandID,
            brand_name: brandName,
            description: details,
            values: keyValuePairs,

        };

        const newbrandData = {
            brand_id: brandID,
            brand_name: brandName,
            description: details,
            values: keyValuePairs,
            user_id: user.user_id
        };


        setLoading(true);

        if (editing) {
            fetch(`${API_BASE_URL}/update_brand/${brandID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editingbrandData)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Brand edited successfully:', data);
                    setResponseMessage('Brand edited successfully!');
                    window.location.reload();
                    // Perform any necessary actions after brand creation
                })
                .catch((error) => {
                    console.error('Error edited brand:', error);
                    setResponseMessage('Brand editing failed!');
                }).finally(() => {
                    setLoading(false);
                });
        } else {
            fetch(`${API_BASE_URL}/add_brands`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newbrandData)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Brand created successfully:', data);
                    setResponseMessage('Brand created successfully!');
                    window.location.reload();
                    // Perform any necessary actions after brand creation
                })
                .catch((error) => {
                    console.error('Error creating brand:', error);
                    setResponseMessage('Brand creation failed!');
                })
                .finally(() => {
                    setLoading(false);
                    setBrandID(0);
                    setbrandName('');
                    setDetails('');
                    setKeyValuePairs({});
                });
        }
    };

    const handleClose = () => {
        setResponseMessage(null);
    };

    return (

        <Box style={{ minWidth: '300px' }}>
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
                <h2 className="text-2xl font-bold mb-4">Create New Brand</h2>

                <div className="mb-4">
                    <CustomFormLabel htmlFor="brandName">
                        Brand Name:
                    </CustomFormLabel>
                    <CustomTextField
                        type="text"
                        id="brandName"
                        name="brandName"
                        value={brandName}
                        onChange={(e) => setbrandName(e.target.value)}
                        fullWidth
                        size='small'
                    />
                    {
                        brandError && <span style={{color:'red'}}>{brandError}</span>
                    }
                </div>

                <div className="mb-4">
                    <CustomFormLabel htmlFor="details">
                        Description:
                    </CustomFormLabel>
                    <CustomTextField
                        type="text"
                        id="details"
                        name="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        fullWidth
                        size='small'
                    />
                </div>

                <div className="mb-4">
                    <CustomFormLabel>Brand Details:</CustomFormLabel>
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

                </div>
                    <Button
                        variant='contained'
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
            </Box>
        </Box>
    );
};

export default BrandForm;
