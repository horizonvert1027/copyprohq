// import React, { useState } from 'react';
// import DocumentUpload from './upload';
// import ProjectList from './projectList';
// import { FiX } from 'react-icons/fi';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Form from './projectCreateForm';
// import {
//     Drawer,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     IconButton,
//     Toolbar,
//     Dialog,
//     DialogTitle,
//     Typography,
//     DialogContent,
//     TextField,
//     Button,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { styled } from '@mui/material/styles';
// import Divider from '@mui/material/Divider';
// import ListItemButton from '@mui/material/ListItemButton';
// import MuiAppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// // import ProjectList from '../components/projectList';
// import { FiUpload } from 'react-icons/fi';
// // import AddCircleIcon from '@mui/icons-material/AddCircle';
// // import ProjectsPage from '../components/PorjectsPage';
// const drawerWidth = 240;
// const ProjectsPage = ({ selectedBrand }) => {
//     const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);
//     const [open, setOpen] = useState(false);
//     const [selectedWf, setSelectedWf] = useState(null);

//     const handleDrawerOpen = () => {
//         setOpen(true);
//     };

//     const handleDrawerClose = () => {
//         setOpen(false);
//     };

//     const handleBrandClick = (brand) => {
//         setSelectedWf(brand);
//     };

//     const AppBar = styled(MuiAppBar, {
//         shouldForwardProp: (prop) => prop !== 'open',
//     })(({ theme, open }) => ({
//         transition: theme.transitions.create(['margin', 'width'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         ...(open && {
//             width: `calc(100% - ${drawerWidth}px)`,
//             marginLeft: `${drawerWidth}px`,
//             transition: theme.transitions.create(['margin', 'width'], {
//                 easing: theme.transitions.easing.easeOut,
//                 duration: theme.transitions.duration.enteringScreen,
//             }),
//         }),
//     }));
//     const handleCreateProjectClick = () => {
//         setCreateProjectDialogOpen(true);
//     };

//     const handleCreateProjectDialogClose = () => {
//         setCreateProjectDialogOpen(false);
//     };

//     const brands = [
//         {
//             id: 1,
//             name: 'WF 1',
//             projects: [
//                 { id: 1, name: 'Project 1' },
//                 { id: 2, name: 'Project 2' },
//             ],
//         },
//         {
//             id: 2,
//             name: 'WF 2',
//             projects: [
//                 { id: 3, name: 'Project 3' },
//                 { id: 4, name: 'Project 4' },
//             ],
//         },
//         {
//             id: 3,
//             name: 'WF 3',
//             projects: [
//                 { id: 5, name: 'Project 5' },
//                 { id: 6, name: 'Project 6' },
//             ],
//         },
//     ];
//     console.log(selectedBrand, brands)

//     return (
//         <div className='flex'>

//             <AppBar position="fixed" open={open}>
//                 <Toolbar>
//                     <IconButton
//                         color="inherit"
//                         aria-label="open drawer"
//                         onClick={handleDrawerOpen}
//                         edge="start"
//                         sx={{ mr: 2, ...(open && { display: 'none' }) }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" noWrap component="div">
//                         Work Flow Application
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: drawerWidth,
//                         boxSizing: 'border-box',
//                     },
//                 }}
//                 variant="persistent"
//                 anchor="left"
//                 open={open}
//             >
//                 <div className="flex flex-end px-2 py-1">
//                     <IconButton onClick={handleDrawerClose}>
//                         <ChevronLeftIcon />
//                     </IconButton>
//                 </div>
//                 <Divider />
//                 <List>
//                     {brands.map((brand) => (
//                         <ListItem key={brand.id} disablePadding>
//                             <ListItemButton onClick={() => handleBrandClick(brand)}>
//                                 <ListItemIcon>
//                                     <InboxIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary={brand.name} />
//                             </ListItemButton>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//             <div className="flex flex-col items-center justify-center">
//                 {selectedBrand && (
//                     <div>
//                         <Form />
//                         <div className="flex items-center justify-between my-4">
//                             <Typography variant="h6" gutterBottom>
//                                 {selectedBrand.name} Details
//                             </Typography>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleCreateProjectClick}
//                                 startIcon={<AddCircleIcon />}
//                             >
//                                 Create Project
//                             </Button>
//                         </div>
//                         <ProjectList projects={selectedBrand.projects} />
//                     </div>
//                 )}
//                 {/* Create Project Dialog */}
//                 <Dialog open={createProjectDialogOpen} onClose={handleCreateProjectDialogClose}>
//                     <DialogTitle>Create Project</DialogTitle>
//                     <DialogContent>
//                         <TextField label="Project Name" fullWidth />
//                         {/* Other project details */}
//                         <Button variant="contained" color="primary">
//                             Create
//                         </Button>
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </div>

//     );
// };

// export default ProjectsPage;
