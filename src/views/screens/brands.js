import React, { useState } from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';

import HomeSec from '../components/homeSec'
import SnackAlert from '../../components/elements/SnackAlert';
import {API_BASE_URL} from '../../config';

const Brands = ({ selectedBrand, brands, projects, handleProjectClick }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openProjectListDialog, setProjectOpenDialog] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const openProjectDialogHandle = () => {
        setProjectOpenDialog(true);
    };

    const closeProjectDialog = () => {
        setProjectList([]);
        setProjectOpenDialog(false);
    };
    const handleAddProjectClick = (project) => {
        if (projectList.includes(project)) {
            setProjectList(projectList.filter((p) => p !== project));
        } else {
            setProjectList([...projectList, project]);
        }
    }
    const saveSelectedProjects = () => {
        if ( projectList.length === 0 ) {
            setMessage('There is no selected projects!');
            setSeverity('error');
            setAlertOpen(true);
            return ;
        }
        if ( isSubmitting ) return ;
        setIsSubmitting(true);
        const temp = projectList.map((one) => { return one.id })
        const updateData = {
            brand_id: selectedBrand.id,
            project_ids: temp
        }
        fetch(`${API_BASE_URL}/update_projects/${selectedBrand.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        .then((response) => response.json())
        .then((data) => {
            if ( data.messages ){
                setMessage(`Selected projects are added at Brand(${selectedBrand.name})`);
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
    const handleAlertClose = () => {
        setAlertOpen(false);
    }
    return (
        <div className='mx-auto px-6'>
            <SnackAlert open={alertOpen} severity={severity} handleClose={handleAlertClose} message={message}/>
            <div>
                <Dialog
                    maxWidth={'sm'}
                    fullWidth
                    open={openProjectListDialog} onClose={closeProjectDialog}>
                    <DialogTitle>Select Projects</DialogTitle>
                    <DialogContent>
                        <List>
                            {projects
                                .filter((project) => !project.brand_id )
                                .map((project) => (
                                    <ListItem
                                        key={project.id}
                                        onClick={() => handleAddProjectClick(project)}
                                    >
                                        <ListItemIcon>
                                            {projectList.some((selectedProject) => selectedProject.id === project.id) ? (
                                                <CheckIcon />
                                            ) : (
                                                <Checkbox
                                                    checked={projectList.some((selectedProject) => selectedProject.id === project.id)}
                                                    onChange={() => handleAddProjectClick(project)}
                                                />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={project.name} />
                                    </ListItem>
                                ))}

                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeProjectDialog}>Cancel</Button>
                        <Button onClick={saveSelectedProjects} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {!selectedBrand ? (
                    <HomeSec />

                ):(
                    <div className='mx-auto'>
                        <div className="flex items-center justify-between my-4">
                            <Typography variant="h6" gutterBottom>
                                {`Projects List`}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={openProjectDialogHandle}
                                startIcon={<AddCircleIcon />}
                            >
                                Add Project
                            </Button>
                        </div>
                        <div
                            style={{ cursor: 'pointer' }}
                            className="grid grid-cols-1 gap-4 mt-4"
                        >
                            {projects
                                .filter((project) => project.brand_id === selectedBrand.id)
                                .map((project) => (
                                    <Card key={project.id} onClick={() => {
                                        handleProjectClick()
                                    }}>
                                        <CardContent>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Typography variant="h6">{project.name}</Typography>
                                                {/* Other project details */}
                                                {projectList.includes(project) && (
                                                    <IconButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setProjectList(projectList.filter((p) => p !== project));
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
                )}
            </div>
        </div>
    )
}

export default Brands
