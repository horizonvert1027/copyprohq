import React, {  useState } from 'react';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Card, CardContent } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';
import {API_BASE_URL} from '../../config';

function Workflows({selectedWorkflows, dialogs, handleDialogClick }) {
    const [dialogList, setDialogList] = useState([]);
    const [openDialogListDialog, setDialogOpenDialog] = useState(false);
    const [selectedDialogstoRun, setSelectedDialogstoRun] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [alertOpen, setAlertOpen] = useState(false);

    const handleDialogCheckboxChange = (dialogId) => {
        setSelectedDialogstoRun((prevSelectedDialogs) => {
            if (prevSelectedDialogs.includes(dialogId)) {
                return prevSelectedDialogs.filter((id) => id !== dialogId);
            } else {
                return [...prevSelectedDialogs, dialogId];
            }
        });
    };
    const handleRunButtonClick = async () => {
        try {
            setLoading(true);

            // Send the selectedDialogstoRun array to the backend
            // Implement the logic to handle passing the selected dialogs to the backend
            const response = await fetch(`${API_BASE_URL}/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedDialogstoRun),
            });
            const responseData = await response.text();
            // console.log('Response Text:', responseData);
            // Save the responses in a text file
            const blob = new Blob([JSON.stringify(responseData)], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'responses.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const openDialogHandlePopup = () => {
        
        setDialogOpenDialog(true);
    };

    const closeDialogPopup = () => {
        setDialogList([]);
        setDialogOpenDialog(false);
    };
    const saveSelectedDialogs = () => {
        if ( !selectedWorkflows ){
            setMessage('You have not select workflow!');
            setSeverity('error');
            setAlertOpen(true);
            closeWFDialog();
            return ;
        }
        if ( dialogList.length === 0 ) {
            setMessage('There is no selected dialogs!');
            setSeverity('error');
            setAlertOpen(true);
            return ;
        }
        if ( isSubmitting ) return ;
        setIsSubmitting(true);
        const temp = dialogList.map((one) => { return one.id })
        const updateData = {
            workflow_id: selectedWorkflows.id,
            dialog_ids: temp
        }
        fetch(`${API_BASE_URL}/update_dialogs/${selectedWorkflows.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        .then((response) => response.json())
        .then((data) => {
            if ( data.messages ){
                setMessage(`Selected projects are added at Workflow(${selectedWorkflows.name})`);
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
    const handleAddDialogClick = (dialog) => {
        if (dialogList.includes(dialog)) {
            setDialogList(dialogList.filter((p) => p !== dialog));
        } else {
            setDialogList([...dialogList, dialog]);
        }
    }
    console.log(selectedWorkflows);
    console.log(dialogList);
    return (
        <div className='px-6'>
            <Dialog
                maxWidth={'sm'}
                fullWidth
                open={openDialogListDialog} onClose={closeDialogPopup}>
                <DialogTitle>Select Dialogs</DialogTitle>
                <DialogContent>
                    <List>
                        {dialogs
                            .filter((dialog) => !dialog.workflow_id)
                            .map((dialog) => (
                                <ListItem
                                    key={dialog.id}
                                    onClick={() => handleAddDialogClick(dialog)}
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

            {/* <h2 className="text-xl font-semibold my-4">Dialogs</h2> */}
            <div className="flex items-center justify-between my-4">
                <Typography variant="h6" gutterBottom>
                    Dialogs List
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
                {dialogs
                    .filter((dialogs) => dialogs.workflow_id === selectedWorkflows?.id)
                    .map((dialog) => (
                        <Card key={dialog.id}

                        >
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Checkbox
                                            checked={selectedDialogstoRun.includes(dialog.id)}
                                            onChange={() => handleDialogCheckboxChange(dialog.id)}
                                        />
                                        <span
                                            onClick={() => {
                                                handleDialogClick(dialog)
                                            }}>
                                            <Typography variant="h6">{dialog.name}</Typography>
                                        </span>
                                    </div>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDialogList(dialogList.filter((p) => p !== dialog));
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
                {loading && (
                    <Dialog open={true}>
                        <DialogContent>
                            <div className="flex items-center justify-center">
                                <CircularProgress />
                                <Typography variant="h6" style={{ marginLeft: '8px' }}>
                                    ChatGPT is in work...
                                </Typography>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

        </div>
    )
}

export default Workflows
