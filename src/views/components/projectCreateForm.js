import React, { useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import {API_BASE_URL} from '../../config';
import CustomFormLabel from '../../components/form/CustomFormLabel';
import CustomTextField from '../../components/form/CustomTextField';
import { UserRole } from '../../components/constant/constant';
import SnackAlert from '../../components/elements/SnackAlert';

const ProjectForm = ({ brandList, editing, project }) => {
    const [projectID, setPorjectID] = useState((editing) ? project.id : 0);
    const [projectName, setProjectName] = useState((editing) ? project.name : '');
    const [details, setDetails] = useState((editing) ? project.description : '');
    const [keyValuePairs, setKeyValuePairs] = useState((editing && project.values != null) ? JSON.parse(project.values) : {});
    const [currentKey, setCurrentKey] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [message, setMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');

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

    const handleRemovePair = (index) => {
        const updatedPairs = { ...keyValuePairs };
        delete updatedPairs[index];
        setKeyValuePairs(updatedPairs);
    };

    const handleSubmit = () => {
        if ( isSubmitting ) return ;
        setIsSubmitting(true);
        const temp = window.sessionStorage.getItem(UserRole.USER);
        if (!temp) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(temp);
        if ( !projectName ){
            setIsSubmitting(false);
            setMessage('Project Name is required!');
            setSeverity('error');
            setAlertOpen(true);
            return ;
        }
        const projectData = {
            project_name: projectName,
            description: details,
            values: keyValuePairs,
            user_id: user.user_id
        };

        if (editing) {
            fetch(`${API_BASE_URL}/update_project/${projectID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Project updated successfully:', data);
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    setSnackbarMessage('Project updated successfully!');
                    setSnackbarOpen(true);
                    setPorjectID(0);
                    setBrandID(0);
                    setProjectName('');
                    setDetails('');
                    setKeyValuePairs({})
                    // Perform any necessary actions after project creation
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error updating project:', error);
                    setIsSubmitting(false);
                    setSnackbarMessage('Project updating failed!');
                    setSnackbarOpen(true);
                });
        } else {
            fetch(`${API_BASE_URL}/add_projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            })
                .then((response) => response.json())
                .then((data) => {
                    if ( data.messages ){
                        setIsSubmitting(false);
                        setMessage('Project created successfully');
                        setSeverity('success');
                        setAlertOpen(true);
                        setProjectName('');
                        setDetails('');
                        setKeyValuePairs({})
                        // Perform any necessary actions after project creation
                        window.location.reload();
                    } else {
                        setIsSubmitting(false);
                        setMessage('Project creation failed!');
                        setSeverity('error');
                        setAlertOpen(true);
                    }
                })
                .catch((error) => {
                    setIsSubmitting(false);
                    setMessage('Project creation failed!');
                    setSeverity('error');
                    setAlertOpen(true);
                });
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    }
    return (
        <div style={{ minWidth: '300px' }}>
            <SnackAlert open={alertOpen} severity={severity} handleClose={handleAlertClose} message={message}/>
            <Box>
                <div className="mb-4">
                    <CustomFormLabel htmlFor="projectName">
                        Project Name:
                    </CustomFormLabel>
                    <CustomTextField
                        id="projectName"
                        name="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        fullWidth
                        size="small"
                    />
                </div>

                <div className="mb-4">
                    <CustomFormLabel htmlFor="details">
                        Description:
                    </CustomFormLabel>
                    <CustomTextField
                        id="details"
                        name="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        fullWidth
                        size="small"
                    />
                </div>

                <div className="mb-4">
                    <CustomFormLabel>Project Details:</CustomFormLabel>
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
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                >
                    {isSubmitting ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress size={20} color="inherit" />
                        </Box>
                    ) : (
                        'Submit'
                    )}
                </Button>

                {/* {isSubmitted && <p>Project submitted successfully.</p>} */}
            </Box>
        </div>
    );
};

export default ProjectForm;

