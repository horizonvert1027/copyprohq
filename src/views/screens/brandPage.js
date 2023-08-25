import React, { useEffect, useState } from 'react';
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
import ProjectList from '../components/projectList';
import { FiUpload } from 'react-icons/fi';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProjectsPage from '../components/PorjectsPage';
import { Card, CardContent } from '@mui/material';
import ProjectForm from '../components/projectCreateForm';
import DialogForm from '../components/dialogForm';
import HomeSec from '../components/homeSec';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import WorkflowForm from '../components/wfCreateForm';
import NewDialogForm from '../components/newDialogCreateForm';
import BrandForm from '../components/newBrandForm';

import {API_BASE_URL} from '../../config';
const drawerWidth = 240;

const BrandsPage = () => {
    const [open, setOpen] = useState(true);
    const [brands, setBrands] = useState([]);
    const [projects, setProjects] = useState([]);
    const [workflows, setWorkflows] = useState([]);
    const [dialogs, setDialogs] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedWorkflows, setSelectedWorkflows] = useState(null);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [projectList, setProjectList] = useState([]);
    const [openProjectListDialog, setProjectOpenDialog] = useState(false);
    const [workflowList, setWorkflowList] = useState([]);
    const [openWorkflowListDialog, setWorkflowOpenDialog] = useState(false);
    const [dialogList, setDialogList] = useState([]);
    const [openDialogListDialog, setDialogOpenDialog] = useState(false);
    const [openBrandForm, setBrandForm] = useState(false);
    const [selectedDialogstoRun, setSelectedDialogstoRun] = useState([]);

    const handleDialogCheckboxChange = (dialogId) => {
        setSelectedDialogstoRun((prevSelectedDialogs) => {
            if (prevSelectedDialogs.includes(dialogId)) {
                return prevSelectedDialogs.filter((id) => id !== dialogId);
            } else {
                return [...prevSelectedDialogs, dialogId];
            }
        });
    };

    const openBrandFormHandle = () => {
        setBrandForm(true)
    }

    const closeBrandForm = () => {
        setBrandForm(false);
    };

    const openProjectDialogHandle = () => {
        setProjectOpenDialog(true);
    };

    const closeProjectDialog = () => {
        setProjectOpenDialog(false);
    };

    const saveSelectedProjects = () => {

        // Perform any desired actions with the selected projects
        closeProjectDialog();
    };

    const openWFDialogHandle = () => {
        setWorkflowOpenDialog(true);
    };

    const closeWFDialog = () => {
        setWorkflowOpenDialog(false);
    };

    const saveSelectedWorkflows = () => {

        // Perform any desired actions with the selected workflows
        closeWFDialog();
    };

    const openDialogHandlePopup = () => {
        setDialogOpenDialog(true);
    };

    const closeDialogPopup = () => {
        setDialogOpenDialog(false);
    };

    const saveSelectedDialogs = () => {

        // Perform any desired actions with the selected projects
        closeDialogPopup();
    };

    const handleAddDialogClick = (dialog) => {
        if (dialogList.includes(dialog)) {
            setDialogList(dialogList.filter((p) => p !== dialog));
        } else {
            setDialogList([...dialogList, dialog]);
        }
    }



    const handleAddWorkflowClick = (workflow) => {
        if (workflowList.includes(workflow)) {
            setWorkflowList(workflowList.filter((p) => p !== workflow));
        } else {
            setWorkflowList([...workflowList, workflow]);
        }
    }

    const handleAddProjectClick = (project) => {
        if (projectList.includes(project)) {
            setProjectList(projectList.filter((p) => p !== project));
        } else {
            setProjectList([...projectList, project]);
        }
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
        setSelectedProject(null)
        setSelectedWorkflows(null);
        setSelectedDialog(null);
        setProjectList([]);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setSelectedWorkflows(null);
        setSelectedDialog(null);
    };

    const handleWorkflowClick = (wokflow) => {
        setSelectedWorkflows(wokflow);
        setSelectedDialog(null);
    }

    const handleDialogClick = (dialog) => {
        setSelectedDialog(dialog);

    }

    const handleLogoClick = () => {
        setSelectedBrand(null);
        setSelectedProject(null);
        setSelectedWorkflows(null);
        setSelectedDialog(null);
    }

    const handleRunButtonClick = () => {
        // Send the selectedDialogs array to the backend
        // Implement the logic to handle passing the selected dialogs to the backend
        console.log('Selected Dialogs:', selectedDialogstoRun);
    };


    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#172554',
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const handleBreadcrumbClick = (level) => {
        if (level === 'brand') {
            setSelectedProject(null);
            setSelectedWorkflows(null);
            setSelectedDialog(null);
        } else if (level === 'project') {
            setSelectedWorkflows(null);
            setSelectedDialog(null);
        } else if (level === 'workflow') {
            setSelectedDialog(null);
            // setSelectedBrand(null);
            // setSelectedProject(null);
            // setSelectedWorkflows(null)
        }
    };

    // const getBrands = async () => {
    //     try {
    //         const response = await fetch('http://copyprohq.com/brands');
    //         if (response.ok) {
    //             const data = await response.json();
    //             // Process the retrieved brands data
    //             console.log('Brands:', data);
    //             const brands = data.brands;
    //             setBrands(brands)
    //         } else {
    //             console.error('Failed to get brands');
    //         }
    //     } catch (error) {
    //         console.error('Error getting brands:', error);
    //     }
    // };

    // // useEffect(() => {
    // //     // Fetch brands when the component mounts
    // //     getBrands();
    // // }, []);

    // const getProjects = async () => {
    //     try {
    //         const response = await fetch('${API_BASE_URL}/projects');
    //         if (response.ok) {
    //             const data = await response.json();
    //             // Process the retrieved brands data
    //             console.log('Projects:', data);
    //             const projects = data.projects;
    //             setProjects(projects)
    //         } else {
    //             console.error('Failed to get projects');
    //         }
    //     } catch (error) {
    //         console.error('Error getting projects:', error);
    //     }
    // };

    // // useEffect(() => {
    // //     // Fetch brands when the component mounts
    // //     getProjects();
    // // }, []);

    // const getWorkflows = async () => {
    //     try {
    //         const response = await fetch('${API_BASE_URL}/workflows');
    //         if (response.ok) {
    //             const data = await response.json();
    //             // Process the retrieved brands data
    //             console.log('Workflows:', data);
    //             const workflows = data.workflows;
    //             setWorkflows(workflows)
    //         } else {
    //             console.error('Failed to get workflows');
    //         }
    //     } catch (error) {
    //         console.error('Error getting workflows:', error);
    //     }
    // };

    // const getDialogs = async () => {
    //     try {
    //         const response = await fetch('${API_BASE_URL}/dialogs');
    //         if (response.ok) {
    //             const data = await response.json();
    //             // Process the retrieved brands data
    //             console.log('dialogs:', data);
    //             const dialogs = data.dialogs;
    //             setDialogs(dialogs)
    //         } else {
    //             console.error('Failed to get dialogs');
    //         }
    //     } catch (error) {
    //         console.error('Error getting dialogs:', error);
    //     }
    // };

    const getData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get_data`);
            if (response.ok) {
                const data = await response.json();
                // Process the retrieved brands data
                // console.log('brands:', data);
                const brands = data.brands;
                setBrands(brands)

                const projects = data.projects;
                setProjects(projects)

                const workflows = data.workflows;
                setWorkflows(workflows)

                const dialogs = data.dialogs;
                setDialogs(dialogs)
            } else {
                console.error('Failed to get dialogs');
            }
        } catch (error) {
            console.error('Error getting dialogs:', error);
        }
    };

    useEffect(() => {
        // Fetch brands when the component mounts
        getData();
    }, []);

    // Sample data for brands, projects, and workflows
    // const brands = [
    //     { id: 1, name: 'Brand 01' },
    //     { id: 2, name: 'Brand 02' },
    //     { id: 3, name: 'Brand 03' },
    // ];

    // const projects = [
    //     { id: 101, name: 'Project 101', brandId: 1 },
    //     { id: 102, name: 'Project 102', brandId: 1 },
    //     { id: 201, name: 'Project 201', brandId: 2 },
    //     { id: 202, name: 'Project 202', brandId: 2 },
    //     { id: 301, name: 'Project 301', brandId: 3 },
    //     { id: 302, name: 'Project 302', brandId: 3 },
    // ];

    // const workflows = [
    //     { id: 1001, name: 'Workflow 1001', projectId: 101 },
    //     { id: 1002, name: 'Workflow 1002', projectId: 101 },
    //     { id: 1003, name: 'Workflow 1003', projectId: 102 },
    //     { id: 2001, name: 'Workflow 2001', projectId: 201 },
    //     { id: 2002, name: 'Workflow 2002', projectId: 201 },
    //     { id: 3001, name: 'Workflow 3001', projectId: 301 },
    //     { id: 3002, name: 'Workflow 3002', projectId: 301 },
    // ];
    // const dialogs = [
    //     { id: 1001, name: 'Dialog 1001', workflowId: 1001 },
    //     { id: 1002, name: 'Dialog 1002', workflowId: 1001 },
    //     { id: 1003, name: 'Dialog 1003', workflowId: 1002 },
    //     { id: 2001, name: 'Dialog 2001', workflowId: 2001 },
    //     { id: 2002, name: 'Dialog 2002', workflowId: 2001 },
    //     { id: 3001, name: 'Dialog 3001', workflowId: 3001 },
    //     { id: 3002, name: 'Dialog 3002', workflowId: 3001 },
    // ];

    return (
        <div className="flex">
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        <span
                            className="cursor-pointer"
                            onClick={() => handleLogoClick()}>
                            Work Flow Application
                        </span>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className="flex flex-end px-2 py-1">
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Button onClick={openBrandFormHandle}>Create Brand</Button>
                <List>
                    {brands.map((brand) => (
                        <ListItem key={brand.id} disablePadding>
                            <ListItemButton onClick={() => handleBrandClick(brand)}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={brand.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Dialog open={openBrandForm} onClose={closeBrandForm}>
                <DialogContent>
                    <BrandForm />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={closeBrandForm}>Cancel</Button>
                    <Button onClick={console.log('Hri')} color="primary">
                        Save
                    </Button>
                </DialogActions> */}
            </Dialog>
            <Dialog open={openProjectListDialog} onClose={closeProjectDialog}>
                <DialogTitle>Select Projects</DialogTitle>
                <DialogContent>
                    <List>
                        {projectList.map((project) => (
                            <ListItem key={project.id}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={project.name} />
                            </ListItem>
                        ))}
                        {projects
                            .filter((project) => !projectList.some((selectedProject) => selectedProject.id === project.id))
                            .map((project) => (
                                <ListItem
                                    key={project.id}
                                    button
                                    onClick={() => handleAddProjectClick(project)}
                                    disabled={projectList.some((selectedProject) => selectedProject.id === project.id)}
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

            <Dialog open={openWorkflowListDialog} onClose={closeProjectDialog}>
                <DialogTitle>Select Workflows</DialogTitle>
                <DialogContent>
                    <List>
                        {workflowList.map((workflow) => (
                            <ListItem key={workflow.id}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={workflow.name} />
                            </ListItem>
                        ))}
                        {workflows
                            .filter((workflow) => !workflowList.some((selectedWorkflows) => selectedWorkflows.id === workflow.id))
                            .map((workflow) => (
                                <ListItem
                                    key={workflow.id}
                                    button
                                    onClick={() => handleAddWorkflowClick(workflow)}
                                    disabled={workflowList.some((selectedWorkflows) => selectedWorkflows.id === workflow.id)}
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

            <Dialog open={openDialogListDialog} onClose={closeDialogPopup}>
                <DialogTitle>Select Dialogs</DialogTitle>
                <DialogContent>
                    <List>
                        {dialogList.map((dialog) => (
                            <ListItem key={dialog.id}>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={dialog.name} />
                            </ListItem>
                        ))}
                        {dialogs
                            .filter((dialog) => !dialogList.some((selectedDialog) => selectedDialog.id === dialog.id))
                            .map((dialog) => (
                                <ListItem
                                    key={dialog.id}
                                    button
                                    onClick={() => handleAddDialogClick(dialog)}
                                    disabled={dialogList.some((selectedDialog) => selectedDialog.id === dialog.id)}
                                >
                                    <ListItemIcon>
                                        {dialogList.some((selectedDialog) => selectedDialog.id === dialog.id) ? (
                                            <CheckIcon />
                                        ) : (
                                            <Checkbox
                                                checked={dialogList.some((selectedDialog) => selectedDialog.id === dialog.id)}
                                                onChange={() => handleAddDialogClick(dialog)}
                                            />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={dialog.name} />
                                </ListItem>
                            ))}

                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogPopup}>Cancel</Button>
                    <Button onClick={saveSelectedDialogs} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <main style={{ marginTop: '64px' }} className={`ml-${open ? '0' : drawerWidth} flex-grow p-3 transition-all duration-300 `}>
                {/* <div className="flex-grow bg-gray-100"> */}
                {/* Breadcrumb */}
                <div className="p-4 bg-white">
                    <p className="text-sm text-gray-500">
                        {selectedBrand && (
                            <span
                                className="cursor-pointer"
                                onClick={() => handleBreadcrumbClick('brand')}
                            >
                                {selectedBrand.name}
                            </span>
                        )}
                        {selectedProject && (
                            <>
                                {' > '}
                                <span
                                    className="cursor-pointer"
                                    onClick={() => handleBreadcrumbClick('project')}
                                >
                                    {selectedProject.name}
                                </span>
                            </>
                        )}
                        {selectedWorkflows && (
                            <>
                                {' > '}
                                <span
                                    className="cursor-pointer"
                                    onClick={() => handleBreadcrumbClick('workflow')}
                                >
                                    {selectedWorkflows.name}
                                </span>
                            </>
                        )}
                        {selectedDialog && (
                            <>
                                {' > '}
                                <span
                                    className="cursor-pointer"
                                    onClick={() => handleBreadcrumbClick('dialog')}
                                >
                                    {selectedDialog.name}
                                </span>
                            </>
                        )}
                    </p>
                </div>
                <div>
                    {!selectedBrand && (
                        <HomeSec />

                    )}
                </div>



                {/* {Projects} */}
                <div
                    className="flex items-center justify-center">
                    {selectedBrand && !selectedProject && !selectedWorkflows && !selectedDialog && (
                        <div>
                            <ProjectForm brandList={brands} />
                            <h2 className="text-2xl font-bold my-8">Projects</h2>
                            <div className="flex items-center justify-between my-4">
                                <Typography variant="h6" gutterBottom>
                                    {selectedBrand.name} Projects
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
                                className="grid grid-cols-1 gap-4 mt-4">
                                {projectList
                                    // .filter((project) => project.brandId === selectedBrand.id)
                                    .map((project) => (
                                        <Card key={project.id} onClick={() => {
                                            console.log(project.id);
                                            handleProjectClick(project)
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

                    {/* {Workflows} */}
                    {selectedProject && !selectedWorkflows && !selectedDialog && (
                        <div>
                            <WorkflowForm projectList={projects} />
                            <h2 className="text-2xl font-bold my-8">WorkFlows</h2>
                            <div className="flex items-center justify-between my-4">
                                <Typography variant="h6" gutterBottom>
                                    {selectedBrand.name} Workflows
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
                                {workflowList
                                    // .filter((workflow) => workflow.projectId === selectedProject.id)
                                    .map((workflow) => (
                                        <Card key={workflow.id}
                                            onClick={() => {
                                                console.log(workflow.id);
                                                handleWorkflowClick(workflow)
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
                    )}

                    {/* {Dialogs} */}
                    {selectedWorkflows && !selectedDialog && (
                        <div>

                            <NewDialogForm workflowList={workflows} />
                            <h2 className="text-xl font-semibold my-4">Dialogs</h2>
                            <div className="flex items-center justify-between my-4">
                                <Typography variant="h6" gutterBottom>
                                    {selectedWorkflows.name} Dialogs
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={openDialogHandlePopup}
                                    startIcon={<AddCircleIcon />}
                                >
                                    Add Dialogs
                                </Button>
                            </div>
                            <div
                                style={{ cursor: 'pointer' }}
                                className="grid grid-cols-1 gap-4 mt-4">
                                {dialogList
                                    // .filter((dialogs) => dialogs.workflowId === selectedWorkflows.id)
                                    .map((dialogs) => (
                                        <Card key={dialogs.id}

                                        >
                                            <CardContent>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <Checkbox
                                                            checked={selectedDialogstoRun.includes(dialogs.id)}
                                                            onChange={() => handleDialogCheckboxChange(dialogs.id)}
                                                        />
                                                        <span
                                                            onClick={() => {
                                                                console.log(dialogs.id);
                                                                handleDialogClick(dialogs)
                                                            }}>
                                                            <Typography variant="h6">{dialogs.name}</Typography>
                                                        </span>
                                                    </div>
                                                    <IconButton
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDialogList(dialogList.filter((p) => p !== dialogs));
                                                        }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                            <div className='mt-6'>
                                <Button variant="contained" color="primary" onClick={handleRunButtonClick}>
                                    Run
                                </Button>
                            </div>

                        </div>
                    )

                    }

                    {selectedDialog && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">{selectedDialog.name}</h2>
                            {/* <Form /> */}
                            <DialogForm />

                        </div>
                    )

                    }
                </div>
            </main>
        </div>
    );
};

export default BrandsPage;