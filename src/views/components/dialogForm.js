import React, { useEffect, useState } from 'react';
import { TextField, Typography, IconButton, Button, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import {API_BASE_URL} from '../../config';
import ResizableTextarea from './textInput';
import RunOutcome from './runoutcome';
import { UserRole } from '../../components/constant/constant';

const DialogForm = ({ selectedDialog, dialogs, selectedDialogstoRun }) => {
    const [user, setUser] = useState(null);
    const [prompts, setPrompts] = useState([]);
    const [showDialog, setShowDialog] = useState(false); // State to handle the dialog popup
    const [dIDtoSave, setSavingID] = useState('')
    const [promptsLoading, setPomptsLoading] = useState(false)
    const [loading, setLoading] = useState(false);
    const [exportloading, setExportloading] = useState(false);
    const [responseData, setResponseData] = useState('');
    const [showResponsePage, setShowResponsePage] = useState(false);

    // Function to handle adding a new prompt
    const handleAddPrompt = () => {
        setPrompts([...prompts, '']);
    };

    // Function to handle deleting a prompt
    const handleDeletePrompt = (index) => {
        const updatedPrompts = [...prompts];
        updatedPrompts.splice(index, 1);
        setPrompts(updatedPrompts);
    };

    // Function to handle updating a prompt value
    const handlePromptChange = (index, value) => {
        const updatedPrompts = [...prompts];
        updatedPrompts[index] = value;
        setPrompts(updatedPrompts);
    };

    // Function to handle saving prompts
    const handleSavePrompt = () => {
        if (!selectedDialog) {
            setShowDialog(true);
        } else {
            savePrompts();
        }
    };
    useEffect(() => {
        const temp = window.sessionStorage.getItem(UserRole.USER);
        if (!temp) {
            navigate('/login');
            return;
        }
        setUser(JSON.parse(temp));
    },[]);
    // Function to send prompts to the backend
    const savePrompts = async (dIDtoSave) => {
        try {
            const promptRequest = {
                dialog_id: selectedDialog ? selectedDialog.id : dIDtoSave,
                prompts: prompts,
                user_id: user.user_id
            };

            const response = await fetch(`${API_BASE_URL}/add_prompt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(promptRequest),
            });

            if (response.ok) {
                console.log('Prompts saved successfully!');

            } else {
                console.error('Failed to save prompts.');
            }
        } catch (error) {
            console.error('Error saving prompts:', error);
        }
    };

    const handleRunButtonClick = async () => {
        if (!selectedDialog && selectedDialogstoRun.length === 0) {
            alert('Please select a dialog to run or check at least one checkbox.');
            return;
        }

        try {
            setLoading(true);
            const dialogsToRun = [];

            if (selectedDialog) {
                dialogsToRun.push(selectedDialog.id);
            } else {
                dialogsToRun.push(...selectedDialogstoRun);
            }

            // Send the selectedDialogstoRun array to the backend
            const response = await fetch(`${API_BASE_URL}/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ dialog_ids: dialogsToRun, user_id: user.user_id }),
            });

            const responseData = await response.text();
            setResponseData(responseData);
            setShowResponsePage(true);
            console.log(responseData);
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

    const handleExportButtonClick = async () => {
        if (!selectedDialog && selectedDialogstoRun.length === 0) {
            // Show error message if no dialog is selected and no checkboxes are selected
            alert('Please select a dialog to export or check at least one checkbox.');
            return;
        }

        try {
            setExportloading(true);
            const dialogsToExport = [];

            if (selectedDialog) {
                // If a specific dialog is selected, add it to the list
                dialogsToExport.push(selectedDialog.id);
            } else {
                // If no specific dialog is selected, add all selectedDialogstoRun
                dialogsToExport.push(...selectedDialogstoRun);
            }

            // Send the dialogsToExport array to the backend for exporting
            const response = await fetch(`${API_BASE_URL}/export`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dialogsToExport),
            });

            console.log(response);
            const responseData = await response.text();
            // Save the exported data in a text file
            const blob = new Blob([JSON.stringify(responseData)], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'exported_data.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setExportloading(false);
        }
    };


    function fetchPrompts() {
        setPomptsLoading(true);
        try {
            if (selectedDialog) {
                fetch(`${API_BASE_URL}/prompts/${selectedDialog.id}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const prompts = data.prompts.map((promptObj) => {
                            if (typeof promptObj === 'string') {
                                return promptObj;
                            } else if (Array.isArray(promptObj.prompt)) {
                                return promptObj.prompt.join(' ');
                            } else {
                                return String(promptObj.prompt);
                            }
                        });
                        setPrompts(prompts.length > 0 ? prompts : ['']);
                    })
                    .catch((error) => {
                        console.error('Error fetching prompts:', error);
                    });
            }
            else { setPrompts([]) }
        }
        catch (error) {
            console.error('Error:', error);
        } finally {
            setPomptsLoading(false);
        }
    }

    useEffect(() => {
        fetchPrompts();
    }, [selectedDialog]);
    console.log(prompts);

    return (
        <>
            {showResponsePage ? (
                <div
                    style={{ width: '80vw' }}
                    className="bg-white p-4 ">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Generated Response</h2>
                        <button
                            onClick={() => setShowResponsePage(false)} // Go back to prompts when the button is clicked
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Back to Prompts
                        </button>
                    </div>
                    <RunOutcome responseData={responseData} />
                </div>
            ) : (
                <div>
                    {/* {selectedDialog ? ( */}
                    <div>
                        {promptsLoading ? (
                            <Dialog open={true}>
                                <DialogContent>
                                    <div className="flex items-center justify-center">
                                        <CircularProgress />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ):prompts.map((prompt, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <textarea
                                    style={{
                                        width: '100%',
                                        padding: '8px', // Optional: Add some padding to improve appearance
                                        border: '1px solid #ccc', // Border style and color
                                        borderRadius: '4px'
                                    }}
                                    value={prompt}
                                    onChange={(e) => handlePromptChange(index, e.target.value)}
                                    onBlur={handleSavePrompt}
                                />
                                <IconButton onClick={() => handleDeletePrompt(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        ))}

                        <div className="flex justify-end mt-2">
                            <IconButton onClick={handleAddPrompt}>
                                <AddCircleIcon />
                            </IconButton>
                        </div>

                        <div className="fixed bottom-4 left-60 flex justify-between">
                            <Button onClick={handleRunButtonClick}> Run </Button>
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
                            {exportloading && (
                                <Dialog open={true}>
                                    <DialogContent>
                                        <div className="flex items-center justify-center">
                                            <CircularProgress />
                                            <Typography variant="h6" style={{ marginLeft: '8px' }}>
                                                Export in process...
                                            </Typography>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                            <Button onClick={handleExportButtonClick} > Export </Button>
                        </div>
                        <div className="fixed bottom-4 right-4 flex justify-between">
                            <Button onClick={handleSavePrompt}>Save</Button>
                        </div>
                    </div>
                    <Dialog
                        fullWidth
                        maxWidth={'sm'}
                        open={showDialog} onClose={() => setShowDialog(false)}>
                        <DialogTitle>Please select Dialog</DialogTitle>
                        <div className='mb-4 p-6'>
                            <label htmlFor='dialog' className='block mb-2 text-lg font-medium text-gray-800'>
                                Dialog:
                            </label>
                            <select
                                id='dialog'
                                value={dIDtoSave}
                                onChange={(e) => setSavingID(e.target.value)}
                                className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            >
                                <option value=''>Select Dialog</option>
                                {dialogs.map((dialogs) => (
                                    <option key={dialogs.id} value={dialogs.id}>
                                        {dialogs.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <DialogActions>
                            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                            <Button onClick={() => {
                                setShowDialog(false);
                                savePrompts(dIDtoSave);
                            }}>Confirm</Button>
                        </DialogActions>
                    </Dialog>
                </div >
            )}
        </>
    );
};

export default DialogForm;