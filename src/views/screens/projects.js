import React, { useState } from 'react'

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import { Card, CardContent } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import SnackAlert from '../../components/elements/SnackAlert';
import { API_BASE_URL } from '../../config';

function Projects({ selectedProject, handleWorkflowClick, workflows }) {
    const [openWorkflowListDialog, setWorkflowOpenDialog] = useState(false);
    const [workflowList, setWorkflowList] = useState([]);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [alertOpen, setAlertOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const openWFDialogHandle = () => {
        setWorkflowOpenDialog(true);
    };

    const closeWFDialog = () => {
        setWorkflowList([]);
        setWorkflowOpenDialog(false);
    };

    const saveSelectedWorkflows = () => {
        if ( !selectedProject ){
            setMessage('You have not select project!');
            setSeverity('error');
            setAlertOpen(true);
            closeWFDialog();
            return ;
        }
        if ( workflowList.length === 0 ) {
            setMessage('There is no selected workflows!');
            setSeverity('error');
            setAlertOpen(true);
            return ;
        }
        if ( isSubmitting ) return ;
        setIsSubmitting(true);
        const temp = workflowList.map((one) => { return one.id })
        const updateData = {
            project_id: selectedProject.id,
            workflow_ids: temp
        }
        fetch(`${API_BASE_URL}/update_workflows/${selectedProject.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        .then((response) => response.json())
        .then((data) => {
            if ( data.messages ){
                setMessage(`Selected projects are added at Project(${selectedProject.name})`);
                setSeverity('success');
                setAlertOpen(true);
                setIsSubmitting(false);
                window.location.reload();
            } else {
                setMessage('Sorry, try again once more!');
                setSeverity('error');
                setAlertOpen(true);
                setIsSubmitting(false);
            }
        })
        .catch((error) => {
            setMessage('Sorry, try again once more!');
            setSeverity('error');
            setAlertOpen(true);
            setIsSubmitting(false);
        });
    };
    const handleAddWorkflowClick = (workflow) => {
        if (workflowList.includes(workflow)) {
            setWorkflowList(workflowList.filter((p) => p !== workflow));
        } else {
            setWorkflowList([...workflowList, workflow]);
        }
    }
    const handleAlertClose = () => {
        setAlertOpen(false);
    }
    return (
        <div className='mx-6'>
            <SnackAlert open={alertOpen} severity={severity} handleClose={handleAlertClose} message={message}/>
            <Dialog
                maxWidth={'sm'}
                fullWidth
                open={openWorkflowListDialog} onClose={closeWFDialog}>
                <DialogTitle>Select Workflows</DialogTitle>
                <DialogContent>
                    <List>
                        {workflows
                            .filter((workflow) => !workflow.project_id)
                            .map((workflow) => (
                                <ListItem
                                    key={workflow.id}
                                    onClick={() => handleAddWorkflowClick(workflow)}
                                >
                                    <ListItemIcon>
                                        {workflowList.some((selectedWorkflows) => selectedWorkflows.id === workflow.id) ? (
                                            <CheckIcon />
                                        ) : (
                                            <Checkbox
                                                checked={workflowList.some((selectedWorkflows) => selectedWorkflows.id === workflow.id)}
                                                onChange={() => handleAddWorkflowClick(workflow)}
                                            />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={workflow.name} />
                                </ListItem>
                            ))}

                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeWFDialog}>Cancel</Button>
                    <Button onClick={saveSelectedWorkflows} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="flex items-center justify-between my-4">
                <Typography variant="h6" gutterBottom>
                    Workflows List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={openWFDialogHandle}
                    startIcon={<AddCircleIcon />}
                >
                    Add Workflow
                </Button>
            </div>
            <div
                style={{ cursor: 'pointer' }}
                className="grid grid-cols-1 gap-4 mt-4">
                {workflows
                    .filter((workflow) => workflow.project_id === selectedProject?.id)
                    .map((workflow) => (
                        <Card key={workflow.id}
                            onClick={() => {
                                handleWorkflowClick()
                            }}
                        >
                            <CardContent>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h6">{workflow.name}</Typography>
                                    {/* Other project details */}
                                    {workflowList.includes(workflow) && (
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setWorkflowList(workflowList.filter((p) => p !== workflow));
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>

                                    )}
                                </div>

                            </CardContent>
                        </Card>
                    ))}
            </div>
        </div>
    )
}

export default Projects
