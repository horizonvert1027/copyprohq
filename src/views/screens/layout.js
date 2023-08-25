import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import MuiAppBar from '@mui/material/AppBar';
import ProjectForm from '../components/projectCreateForm';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import WorkflowForm from '../components/wfCreateForm';
import NewDialogForm from '../components/newDialogCreateForm';
import BrandForm from '../components/newBrandForm';
import {API_BASE_URL} from '../../config';
import { format } from 'date-fns';
import SettingsIcon from '@mui/icons-material/Settings';
import DialogSettings from '../components/dialog_settings';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import NewUserForm from '../components/newUserForm';
import { UserRole } from '../../components/constant/constant';


const drawerWidth = 240;

function Layout({ mainComponent }) {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(true);
    const [brands, setBrands] = useState([]);
    const [projects, setProjects] = useState([]);
    const [workflows, setWorkflows] = useState([]);
    const [dialogs, setDialogs] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedWorkflows, setSelectedWorkflows] = useState(null);
    const [selectedDialog, setSelectedDialog] = useState(null);
    const [sidebarItems, setSidebarItems] = useState([]);
    const [openBrandForm, setBrandForm] = useState(false);
    const [openDialogForm, setDialogForm] = useState(false);
    const [showDialogSettings, setShowDialogSettings] = useState(false);
    const [appLevel, setLevel] = useState('brands')
    const [openDialogFormedits, setDialogFormedits] = useState(false);
    const [openWorkflowForm, setWorkflowForm] = useState(false);
    const [selectedDialogstoRun, setSelectedDialogstoRun] = useState([]);
    const [selectedSettingsItem, setSelectedSettingsItem] = useState(null)
    const [editedDialogName, setEditedDialogName] = useState('');
    const [isEditing, setIsEditing] = useState({});
    const [setAPIKEY, setKey] = useState(false)
    const [apiKey, setApiKey] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedDialogsidebar, setSelectedDialogsidebar] = useState()
    const [selectedWorkflowSidebar, setSelectedWorkflowSidebar] = useState()
    const [Workflowformedits, setWorkflowformedits] = useState(false)
    const [selectedBrandSidebar, setSelectedBrandSidebar] = useState()
    const [Brandformedits, setBrandformedits] = useState(false)
    const [showProjectForm, setProjectfrom] = useState(false)
    const [selectedProjectSidebar, setSelectedProjectSidebar] = useState()
    const [Projectformedits, setProjectformedits] = useState(false)
    const [newUserForm, setNewUserForm] = useState(false)
    const [appBarText, setAppBarText] = useState('Work Flow Application');
    // const navigate = useNavigate();
    // const { dispatch } = useAuth();

    const handleOpenNewUserForm = () => {
        setNewUserForm(true);
    };

    const handleCloseNewUserForm = () => {
        setNewUserForm(false);
    };


    useEffect(() => {
        let pathnamesactive = ""
        const pathnames = location.pathname.split(" ")
        pathnames.length > 1 ? pathnamesactive = pathnames[1] : pathnamesactive = pathnames[0]

        if (pathnamesactive === '/brands') {
            setSidebarItems(brands);
            setLevel('brands')

        } else if (pathnamesactive === '/projects') {
            // setSideBarCat('projects')
            setSidebarItems(projects);
            setLevel('projects')

        } else if (pathnamesactive === '/workflows') {
            // setSideBarCat('workflows')
            setSidebarItems(workflows);
            setLevel('workflows')

        }
        else if (pathnamesactive === '/dialogs') {
            // setSideBarCat('dialogs')
            setSidebarItems(dialogs);
            setLevel('dialogs')

        }

    }, [sidebarItems])

    const openAPISetter = () => {
        setKey(true)
    }
    const closeAPISetter = () => {
        setKey(false);
    };

    // const [level, setLevel] = useState('');
    const navigate = useNavigate();
    // Get the current URL path directly from window.location
    const currentPath = window.location.pathname;

    const openBrandFormHandle = () => {
        setBrandForm(true)
    }
    const openDialogFormHandle = () => {
        setDialogForm(true)
        // setSelectedProject
    }
    const closeDialogForm = () => {
        setDialogForm(false);
    };


    const closeBrandForm = () => {
        setBrandForm(false);
    };

    const openWorkflowFormHandle = () => {
        setWorkflowForm(true)
    }

    const openProjectFormHandle = () => {
        setProjectfrom(true)
    }
    const closeWorkflowFormHandle = () => {
        setWorkflowForm(false)
    }
    const closeProjectFormHandle = () => {
        setProjectfrom(false)
    }
    const closeProjectFormeditHandle = () => {
        setProjectformedits(false)
    }

    const closeDialogFormedits = () => {
        setDialogFormedits(false)
    }
    const closeWorkflowFormedits = () => {
        setWorkflowformedits(false)
    }

    const closeBrandFormedits = () => {
        setBrandformedits(false)
    }
    const openDialogFormeditshandle = (dialog) => {
        setSelectedDialogsidebar(dialog)
        setDialogFormedits(true)
    }

    const openWorkflowFormedithandle = (workflow) => {
        setSelectedWorkflowSidebar(workflow)
        setWorkflowformedits(true)

    }

    const openBrandFormedithandle = (brand) => {
        setSelectedBrandSidebar(brand)
        setBrandformedits(true)
    }

    const openProjectFormedithandle = (project) => {
        setSelectedProjectSidebar(project)
        setProjectformedits(true)

    }

    // const openProjectDialogHandle = () => {
    //     setProjectOpenDialog(true);
    // };
    const handleSidebarItemClick = (item) => {
        setAppBarText(item.name);
        if (currentPath === '/') {
            setSelectedBrand(item)

        } else if (currentPath === '/projects') {
            // setSideBarCat('projects')
            setSelectedProject(item)

        } else if (currentPath === '/workflows') {
            // setSideBarCat('workflows')
            setSelectedWorkflows(item)

        }
        else if (currentPath === '/dialogs') {
            // setSideBarCat('dialogs')
            setSelectedDialog(item)

        }
    }

    const formattedDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        // Get individual date components
        const year = format(dateTime, 'yyyy');
        const monthName = format(dateTime, 'MMMM');
        const date = format(dateTime, 'do'); // 'do' formats date with ordinal suffix (e.g., 1st, 2nd, 3rd)
        const hours = format(dateTime, 'h');
        const minutes = format(dateTime, 'mm');
        const amPm = format(dateTime, 'aaa');

        // Format the date-time string as "Month name, date at hour, minute AM/PM"
        const formattedDateTime = `${monthName}, ${date} at ${hours}:${minutes} ${amPm}`;
        return formattedDateTime;
    };

    const getData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get_data/${user.user_id}`);
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

                setSidebarItems(brands)
            } else {
                console.error('Failed to get dialogs');
            }
        } catch (error) {
            console.error('Error getting dialogs:', error);
        }
    };

    useEffect(() => {
        const temp = window.sessionStorage.getItem(UserRole.USER);
        if (!temp) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(temp));
    }, []);
    useEffect(() => {
        if ( !user ) return ;
        getData();
    },[user]);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogoClick = () => {
        setSelectedBrand(null);
        setSelectedProject(null);
        setSelectedWorkflows(null);
        setSelectedDialog(null);
    }

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

    const handleProjectClick = () => {
        setSidebarItems(projects);
        navigate('/projects')
    }

    const handleWorkflowClick = () => {
        setSidebarItems(workflows);
        navigate('/workflows')
    }
    const handleDialogClick = (d) => {
        setSidebarItems(dialogs);
        setSelectedDialog(d)
        // setIsDialogLevel(true)
        setLevel('dialogs')
        navigate('/dialogs')
    }


    const handleBreadcrumbClick = (level) => {
        if (level === 'brands') {
            setSidebarItems(brands)
            setLevel('brands')

        } else if (level === 'projects') {
            setSidebarItems(projects)
            setLevel('projects')
        } else if (level === 'workflows') {
            setSidebarItems(workflows)
            setLevel('workflows')
        }
        else if (level === 'dialogs') {
            // setIsDialogLevel(true)
            setSidebarItems(dialogs)
            setLevel('dialogs')

        }
    };

    const handleDialogCheckboxChange = (dialogId) => {
        setSelectedDialogstoRun((prevSelectedDialogs) => {
            if (prevSelectedDialogs.includes(dialogId)) {
                return prevSelectedDialogs.filter((id) => id !== dialogId);
            } else {
                return [...prevSelectedDialogs, dialogId];
            }
        });
    };

    const handleDialogSettingsClick = (d) => {
        setSelectedSettingsItem(d)
        setShowDialogSettings(true)
    }

    const closeDialogSettings = () => {
        setShowDialogSettings(false)
    }

    const handleDeleteDialog = (dialogId) => {
        fetch(`${API_BASE_URL}/delete_dialog/${dialogId.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                window.location.reload();
            })

            .catch((error) => {
                // Handle errors, display error message, etc.
            });
    };

    const handleEditDialog = (dialogId) => {
        setIsEditing((prevIsEditing) => ({
            ...prevIsEditing,
            [dialogId]: true,
        }));
    };

    const saveEditedDialog = (dialog) => {
        fetch(`${API_BASE_URL}/edit_dialog/${dialog.id}?new_dialog_name=${editedDialogName}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setIsEditing((prevIsEditing) => ({
                    ...prevIsEditing,
                    [dialog.id]: false,
                }));
                window.location.reload();
            })
            .catch((error) => {
                // Handle errors, display error message, etc.
            });
    };

    const handleSave = () => {
        setShowSuccessMessage(true);
        closeAPISetter();
    };

    const handleLogout = () => {
        window.sessionStorage.removeItem(UserRole.USER);
        window.location.reload();
    }

    return (
        <div>
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
                            {appBarText}
                        </span>
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div> {/* Add a flexible space to push LogoutButton to the right */}
                    <IconButton color="inherit" onClick={() => handleLogout()}>
                        <ExitToAppIcon />
                    </IconButton>
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
                <div className="p-4 bg-white">
                    {/* Breadcrumb */}
                    <p>
                        <Link
                            onClick={() => {
                                handleBreadcrumbClick('brands')
                            }}
                            to="/">Brands</Link>
                        {' > '}
                        <Link
                            onClick={() => {
                                handleBreadcrumbClick('projects')
                            }}
                            to="/projects">Projects</Link>
                        {' > '}
                        <Link
                            onClick={() => {
                                handleBreadcrumbClick('workflows')
                            }}
                            to="/workflows">Workflows</Link>
                        {' > '}
                        <Link
                            onClick={() => {
                                handleBreadcrumbClick('dialogs')
                            }}
                            to="/dialogs">Dialogs</Link>
                        {' > '}

                    </p>
                </div>
                <div className="flex flex-end px-2 py-1">
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Dialog
                    maxWidth={'md'}
                    open={openBrandForm} onClose={closeBrandForm}>
                    <DialogContent>
                        <BrandForm editing={false} />
                    </DialogContent>
                </Dialog>

                <Dialog
                    maxWidth={'md'}
                    open={Brandformedits} onClose={closeBrandFormedits}>
                    <DialogContent>
                        <BrandForm editing={true} brand={selectedBrandSidebar} />
                    </DialogContent>
                </Dialog>
                <Snackbar open={showSuccessMessage} autoHideDuration={3000} onClose={() => setShowSuccessMessage(false)}>
                    <MuiAlert elevation={6} variant="filled" onClose={() => setShowSuccessMessage(false)} severity="success">
                        API Key saved successfully!
                    </MuiAlert>
                </Snackbar>
                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={openDialogFormedits} onClose={closeDialogFormedits}>
                    <DialogContent>
                        <NewDialogForm workflowList={workflows} editing={true} previousData={selectedDialogsidebar} />
                    </DialogContent>
                </Dialog>

                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={openWorkflowForm} onClose={closeWorkflowFormHandle}>
                    <DialogContent>
                        <WorkflowForm projectList={projects} editing={false} />
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={showProjectForm} onClose={closeProjectFormHandle}>
                    <DialogContent>
                        <ProjectForm brandList={brands} editing={false} />
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={Projectformedits} onClose={closeProjectFormeditHandle}>
                    <DialogContent>
                        <ProjectForm brandList={brands} editing={true} project={selectedProjectSidebar} />
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={Workflowformedits} onClose={closeWorkflowFormedits}>
                    <DialogContent>
                        <WorkflowForm projectList={projects} editing={true} workflow={selectedWorkflowSidebar} />
                    </DialogContent>
                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={setAPIKEY} onClose={closeAPISetter}>
                    <DialogContent>
                        Set you Open AI key
                        {/* <NewDialogForm workflowList={workflows} /> */}
                        <div className='my-2'></div>
                        <TextField
                            label="API Key"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <div className='my-2'></div>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>

                    </DialogContent>
                </Dialog>
                <Dialog
                    fullWidth
                    maxWidth={'md'}
                    open={openDialogForm} onClose={closeDialogForm}>
                    <DialogContent>
                        <NewDialogForm workflowList={workflows} editing={false} />
                    </DialogContent>
                </Dialog>
                <Dialog open={newUserForm} onClose={handleCloseNewUserForm} fullWidth maxWidth="md">
                    <DialogContent>
                        <NewUserForm onClose={handleCloseNewUserForm}/>
                    </DialogContent>
                </Dialog>
                {appLevel === "brands" && <Button
                    onClick={openBrandFormHandle}
                >Create Brand</Button>}
                {appLevel === "workflows" && <Button
                    onClick={openWorkflowFormHandle}
                >Create Workflow</Button>}
                {appLevel === "projects" && <Button
                    onClick={openProjectFormHandle}
                >Create Project</Button>}


                {appLevel === 'dialogs' ? (
                    <>
                        <Button
                            onClick={openDialogFormHandle}
                        >Create Dialog</Button>
                        <List>

                            {dialogs.map((dialog) => (
                                <ListItem key={dialog.id} disablePadding>
                                    <Checkbox
                                        checked={selectedDialogstoRun.includes(dialog.id)}
                                        onChange={() => handleDialogCheckboxChange(dialog.id)}
                                    />
                                    <ListItemButton onClick={() => handleSidebarItemClick(dialog)}>
                                        <div>
                                            {isEditing[dialog.id] ? (
                                                <TextField
                                                    placeholder={dialog.name}
                                                    value={editedDialogName}
                                                    onChange={(e) => setEditedDialogName(e.target.value)}
                                                />
                                            ) : (
                                                <p>{dialog.name}</p>
                                            )}
                                            <p className='text-gray-500 text-xs'>
                                                {formattedDateTime(dialog.last_modified)}
                                            </p>
                                        </div>
                                    </ListItemButton>
                                    <div className='flex mr-2'>
                                        {isEditing[dialog.id] ? (
                                            <>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => saveEditedDialog(dialog)}
                                                >
                                                    <SaveIcon sx={{ fontSize: "14px" }} />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => openDialogFormeditshandle(dialog)}
                                                >
                                                    <EditIcon sx={{ fontSize: "14px" }} />
                                                </IconButton>
                                            </>
                                        )}
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleDialogSettingsClick(dialog)}
                                        >
                                            <SettingsIcon sx={{ fontSize: "14px" }} />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            onClick={() => handleDeleteDialog(dialog)}
                                        >
                                            <DeleteIcon sx={{ fontSize: "14px" }} />
                                        </IconButton>
                                    </div>
                                    {selectedSettingsItem && (
                                        <DialogSettings
                                            open={showDialogSettings}
                                            onClose={closeDialogSettings}
                                            dialog={selectedSettingsItem}
                                        />
                                    )}
                                </ListItem>
                            ))}

                        </List>
                    </>

                ) : (
                    <List>
                        {sidebarItems.map((item) => (
                            <Box key={item.id}>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => handleSidebarItemClick(item)}
                                    >
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                        <IconButton
                                            edge="end"
                                            onClick={() => {
                                                if (appLevel == "workflows") {
                                                    openWorkflowFormedithandle(item)
                                                }
                                                if (appLevel == "brands") {
                                                    openBrandFormedithandle(item)
                                                }
                                                if (appLevel == "projects") {
                                                    openProjectFormedithandle(item)
                                                }
                                            }}
                                        >
                                            <EditIcon sx={{ fontSize: "14px" }} />
                                        </IconButton>
                                    </ListItemButton>

                                </ListItem>
                                <Divider />
                            </Box>
                        ))}
                    </List>
                )}

                <div className="mt-auto  px-2">
                    <div className="">

                        {user && user.user_type === 'admin' && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        onClick={() => openAPISetter()}
                                    >
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Settings'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleOpenNewUserForm()}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={'Users'} />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Help'} />
                            </ListItemButton>
                        </ListItem>
                    </div>
                </div>
            </Drawer>
            <Box style={{ marginTop: '64px', marginLeft: open?`${drawerWidth}px`:'0px' }} className={`flex-grow p-3 transition-all duration-300 `}>
                {mainComponent && React.cloneElement(mainComponent, {
                    selectedBrand,
                    brands,
                    selectedProject,
                    projects,
                    selectedWorkflows,
                    workflows,
                    selectedDialog,
                    dialogs,
                    handleProjectClick,
                    handleWorkflowClick,
                    handleDialogClick,
                    selectedDialogstoRun
                })}
            </Box>
        </div>
    )
}

export default Layout
