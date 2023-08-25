import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {API_BASE_URL} from '../../config';
import { getUserDataFromLocalStorage } from '../../utils'
import CustomFormLabel from '../../components/form/CustomFormLabel';
import CustomTextField from '../../components/form/CustomTextField';
import { Button } from '@mui/material';
import { UserRole } from '../../components/constant/constant';

const WorkflowForm = ({ projectList, editing, workflow }) => {

    const [workflowID, setWorkflowID] = useState((editing) ? workflow.id : 0);
    const [projectID, setProjectID] = useState((editing) ? workflow.project_id : 0);
    const [workflowName, setWorkflowName] = useState((editing) ? workflow.name : '');
    const [details, setDetails] = useState((editing) ? workflow.description : '');
    const [keyValuePairs, setKeyValuePairs] = useState(
        (editing && workflow.values != null) ? JSON.parse(workflow.values) :
            {}
    );
    const [currentKey, setCurrentKey] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const user = getUserDataFromLocalStorage();


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'key') {
            setCurrentKey(value);
        } else if (name === 'value') {
            setCurrentValue(value);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
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
        if ( isSubmitting ) return ;
        setIsSubmitting(true);
        const temp = window.sessionStorage.getItem(UserRole.USER);
        if (!temp) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(temp);
        const editingworkflowData = {
            workflow_id: workflowID,
            project_id: projectID,
            workflow_name: workflowName,
            description: details,
            values: keyValuePairs,
        };

        const newworkflowData = {
            workflow_id: workflowID,
            project_id: projectID,
            workflow_name: workflowName,
            description: details,
            values: keyValuePairs,
            user_id: user.user_id
        };

        if (editing) {
            fetch(`${API_BASE_URL}/update_workflow/${workflowID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingworkflowData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Workflow updated successfully:', data);
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    setWorkflowID(0);
                    setProjectID(0);
                    setWorkflowName('');
                    setDetails('');
                    setCurrentKey('');
                    setCurrentValue('');

                    // Set the success message for the snackbar
                    setSnackbarMessage('Workflow edited successfully.');
                    setOpenSnackbar(true);
                    window.location.reload();

                    // Perform any necessary actions after workflow creation
                })
                .catch((error) => {
                    console.error('Error creating workflow:', error);
                    setIsSubmitting(false);

                    // Set the error message for the snackbar
                    setSnackbarMessage('Error creating workflow.');
                    setOpenSnackbar(true);

                });
        } else {
            fetch(`${API_BASE_URL}/add_workflows`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newworkflowData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Workflow created successfully:', data);
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    setWorkflowID(0);
                    setProjectID(0);
                    setWorkflowName('');
                    setDetails('');
                    setCurrentKey('');
                    setCurrentValue('');

                    // Set the success message for the snackbar
                    setSnackbarMessage('Workflow created successfully.');
                    setOpenSnackbar(true);
                    window.location.reload();

                    // Perform any necessary actions after workflow creation
                })
                .catch((error) => {
                    console.error('Error creating workflow:', error);
                    setIsSubmitting(false);

                    // Set the error message for the snackbar
                    setSnackbarMessage('Error creating workflow.');
                    setOpenSnackbar(true);
                });
        }


    };

    return (
        <div style={{ minWidth: '300px' }} className="mx-auto shadow rounded-md p-4 w-full">
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarMessage.includes('successfully') ? 'success' : 'error'}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            <Box>

                <div className="mb-4">
                    <CustomFormLabel htmlFor="projectID">
                        Project ID:
                    </CustomFormLabel>
                    <select
                        id="projectID"
                        value={projectID}
                        onChange={(e) => setProjectID(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Project ID</option>
                        {projectList.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <CustomFormLabel htmlFor="workflowName">
                        Workflow Name:
                    </CustomFormLabel>
                    <CustomTextField
                        type="text"
                        id="workflowName"
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        fullWidth
                        size="small"
                    />
                </div>

                <div className="mb-4">
                    <CustomFormLabel htmlFor="details">
                        Description:
                    </CustomFormLabel>
                    <CustomTextField
                        type="text"
                        id="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        fullWidth
                        size="small"
                    />
                </div>

                <div className="mb-4">
                    <CustomFormLabel>Workflow Details:</CustomFormLabel>
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
                    variant='contained'
                    fullWidth
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
        </div>
    );
};

export default WorkflowForm;
