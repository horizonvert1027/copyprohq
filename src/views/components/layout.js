import React, { useState } from 'react';
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
// import ProjectsPage from '../components/PorjectsPage';
const drawerWidth = 240;
const Layout = ({ mainComponent }) => {
    const [open, setOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
    };

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    const brands = [
        {
            id: 1,
            name: 'Brand 1',
            projects: [
                { id: 1, name: 'Project 1' },
                { id: 2, name: 'Project 2' },
            ],
        },
        {
            id: 2,
            name: 'Brand 2',
            projects: [
                { id: 3, name: 'Project 3' },
                { id: 4, name: 'Project 4' },
            ],
        },
        {
            id: 3,
            name: 'Brand 3',
            projects: [
                { id: 5, name: 'Project 5' },
                { id: 6, name: 'Project 6' },
            ],
        },
    ];

    return (
        <div className="flex">
            {/* Drawer */}
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
                        Work Flow Application
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


            {/* Main Component */}
            <main style={{ marginTop: '64px' }} className={`ml-${open ? '0' : drawerWidth} flex-grow p-3 transition-all duration-300 `}>
                <div className="flex items-center justify-center">
                    {mainComponent}
                </div>
            </main>
        </div>
    );
};
export default Layout;