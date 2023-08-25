import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Toolbar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import DocumentUpload from './upload';
import ProjectList from './projectList';
import Layout from './layout';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ProjectDetails = ({ project_id }) => {
    const navigate = useNavigate();
    const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
    const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);

    const handleAddUserClick = () => {
        setAddUserDialogOpen(true);
    };

    const handleAddUserDialogClose = () => {
        setAddUserDialogOpen(false);
    };

    const handleWorkflowClick = () => {
        // Handle workflow click
    };

    const handleBreadcrumbClick = () => {
        // Handle breadcrumb click
        navigate('/brands'); // Navigate back to brands page
    };

    const workflows = [
        {
            id: 1,
            name: 'WF 1',
            projects: [
                { id: 1, name: 'Project 1' },
                { id: 2, name: 'Project 2' },
            ],
        },
        {
            id: 2,
            name: 'WF 2',
            projects: [
                { id: 3, name: 'Project 3' },
                { id: 4, name: 'Project 4' },
            ],
        },
        {
            id: 3,
            name: 'WF 3',
            projects: [
                { id: 5, name: 'Project 5' },
                { id: 6, name: 'Project 6' },
            ],
        },
    ];
    const handleCreateProjectClick = () => {
        setCreateProjectDialogOpen(true);
    };

    const handleCreateProjectDialogClose = () => {
        setCreateProjectDialogOpen(false);
    };

    console.log(project_id)

    return (
        <div>

            <Layout mainComponent={
                <>
                    <div>
                        <DocumentUpload />
                        <div className="flex items-center justify-between my-4">
                            <Typography variant="h6" gutterBottom>
                                Project {project_id} Details
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateProjectClick}
                                startIcon={<AddCircleIcon />}
                            >
                                Create Workflow
                            </Button>
                        </div>
                        <ProjectList projects={workflows} />
                    </div>

                    {/* Add User Dialog */}
                    <Dialog open={addUserDialogOpen} onClose={handleAddUserDialogClose}>
                        <DialogTitle>Add User</DialogTitle>
                        <DialogContent>
                            {/* Add user form */}
                            <TextField label="Name" fullWidth />
                            {/* Other user fields */}
                            <Button variant="contained" color="primary">
                                Add
                            </Button>
                        </DialogContent>
                    </Dialog>

                </>
            } />
        </div>
    );
};

export default ProjectDetails;

