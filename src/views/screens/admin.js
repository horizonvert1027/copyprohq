import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemButton,ListItemIcon,ListItemText,Dialog,DialogContent,Box,Button,DialogTitle,DialogActions, MenuItem, Checkbox } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import {
    CircleCheck,
    CircleX
} from 'tabler-icons-react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';

import {API_BASE_URL} from '../../config';
import NewUserForm from '../components/newUserForm';
import { UserRole, UserType } from '../../components/constant/constant';
import StyledTableNameLabel from './../../components/CustomText/StyledTableNameLabel';
import CustomSelect from '../../components/form/CustomSelect';
import LoadingBox from './../../components/elements/LoadingBox';
import SnackAlert from '../../components/elements/SnackAlert';

const drawerWidth = 240;

function Admin() {
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const [selectedStatusInfo, setSelectedStatusInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        fetch(API_BASE_URL + '/get_all_users')
            .then(response => response.json())
            .then(data => {
                const usersWithIds = data.users.map(user => ({ ...user, id: user.user_id }));
                setUserData(usersWithIds);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleConfirmation = (confirmed) => {
        if (confirmed) {
            // Perform the status change logic here
            // You can use the selectedStatusInfo.row and selectedStatusInfo.newStatus
        }
        setSelectedStatusInfo(null); // Clear the selected status info
    };
    const handleChange = (e, type) => {
        if ( isLoading === true) return ;
        setIsLoading(true);
        fetch(`${API_BASE_URL}/update_acc_status/${type}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: type,
                acc_status: e.target.value
            }),
        }).then((response) => {
                return response.json();
            })
            .then((data) => {
                setSeverity('success');
                setMessage(data.messages);
                setAlertOpen(true);
                setIsLoading(false);
            })
            .catch((error) => {
                setSeverity('error');
                setMessage(error.detail);
                setAlertOpen(true);
                // Handle login error (e.g., display error message)
            }).finally(() => {
                setIsLoading(false); // Stop loading spinner
            });
    }
    const handleCheck = (e,id) => {
        if ( e.target.checked ) {
            setSelectedRows([...selectedRows, id]);
        } else {
            const temp = selectedRows.filter((row) => row !== id);
            setSelectedRows(temp);
        }
    }
    const columns = [
        {
           field: "", headerName: "", width:50,
            renderCell:(params) => (
                <Checkbox onClick={(e) => handleCheck(e,params.row.user_id)}></Checkbox>
            )
        },
        {
            field:'id', headerName:'No'
        },
        { field: 'user_type', headerName: 'Account Type', width: 150,
            renderCell:(params) => (
                <CustomSelect
                    defaultValue={params.row.user_type}
                    onChange={(e) => handleChange(e, params.row.user_id)}
                    fullWidth
                >
                    {
                        UserType.map((user) => (
                            <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                    }
                </CustomSelect>
            )
        },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'company', headerName: 'Company', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'status', headerName: 'Status', width: 150,
            renderCell: (params) => (
                params.row.acc_status === "active" ? (<CircleCheck color='green'></CircleCheck>) : (<CircleX color='red'></CircleX>)
            )
        },
        { field: 'contact_no', headerName: 'Contact No', width: 200 },
        { field: 'no_brands', headerName: 'No. Brands', width: 200 },
        { field: 'no_users', headerName: 'No. Users', width: 200 },

    ];

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
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    }

    const handleLogout = () => {
        window.sessionStorage.removeItem(UserRole.SUPERADMIN);
        window.location.href('/admin/login');
    }

    const handleDelete = () => {
        if ( isLoading === true) return ;
        setIsLoading(true);
        fetch(`${API_BASE_URL}/delete_users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                users: selectedRows
            }),
        }).then((response) => {
                return response.json();
            })
            .then((data) => {
                setSeverity('success');
                setMessage(data.messages);
                setAlertOpen(true);
                setSelectedRows([]);
                setIsLoading(false);
                
            })
            .catch((error) => {
                setSeverity('error');
                setMessage(error.detail);
                setAlertOpen(true);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <Grid container>
            <SnackAlert open={alertOpen} severity={severity} handleClose={handleAlertClose} message={message}/>
            <Grid item sm={12} md={12} lg={12} width={'100%'}>
                <AppBar open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setOpen(true)}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Work Flow Application
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <IconButton color="inherit" onClick={() => handleLogout()}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Grid>
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

                </div>
                <div className="flex flex-end px-2 py-1">
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />

                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                        //   onClick={() => handleSidebarItemClick(brand)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Acounts'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        //   onClick={() => handleSidebarItemClick(brand)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'App Setup'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        //   onClick={() => handleSidebarItemClick(brand)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'User Admins'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        //   onClick={() => handleSidebarItemClick(brand)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Reports'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        //   onClick={() => handleSidebarItemClick(brand)}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={'APIs'} />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>

            {/* New User Form Popup */}
            <Dialog open={isFormOpen} onClose={handleCloseForm} fullWidth maxWidth="sm">
                <DialogContent>
                    {/* Use the NewUserForm component here */}
                    <NewUserForm onClose={handleCloseForm}/>
                </DialogContent>
            </Dialog>
            <Grid mt={10} item sm={12} md={12} lg={12} width={'100%'}>
                <Box style={{ marginLeft: open?`${drawerWidth}px`:'0px' }} className={`flex-grow p-3 transition-all duration-300 `}>
                    <Toolbar>
                        <Box sx={{
                            width:'100%',
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'space-between'
                        }}>
                            <StyledTableNameLabel>Users List</StyledTableNameLabel>
                            <Box sx={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-between',
                                gap:3
                            }}>
                                <Button variant="contained" color="primary" onClick={handleOpenForm}>
                                    Add New User
                                </Button> 
                                <Button
                                    variant='contained' color='primary' onClick={handleDelete}
                                    disabled={selectedRows.length>0?false:true}
                                >
                                    Delete Users
                                </Button>
                            </Box>
                        </Box>
                    </Toolbar>
                    {
                        isLoading? <LoadingBox loading={isLoading} />:
                        <DataGrid
                            rows={userData}
                            columns={columns}
                            disableSelectionOnClick
                        />
                    }
                    <Dialog
                        open={!!selectedStatusInfo}
                        onClose={() => handleConfirmation(false)}
                    >
                        <DialogTitle>Confirm Status Change</DialogTitle>
                        <DialogContent>
                            Are you sure you want to change the status to{' '}
                            {selectedStatusInfo?.newStatus} for user{' '}
                            {selectedStatusInfo?.row?.adminEmail}?
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleConfirmation(false)} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleConfirmation(true)} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Admin;
