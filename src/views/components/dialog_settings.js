import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import {API_BASE_URL} from '../../config';

const DialogSettings = ({ open, onClose, dialog }) => {
    const [model, setModel] = useState('');
    const [temperature, setTemperature] = useState('');
    const [maxLength, setMaxLength] = useState('');
    const [topP, setTopP] = useState('');
    const [frequencyPenalty, setFrequencyPenalty] = useState('');
    const [presencePenalty, setPresencePenalty] = useState('');
    const [bestOf, setBestOf] = useState('');
    const [injectionStartText, setInjectionStartText] = useState('');
    const [injectionRestartText, setInjectionRestartText] = useState('');
    const [showProbabilities, setShowProbabilities] = useState('');
    const [saveFinalOutput, setSaveFinalOutput] = useState(false);
    const [traceText, setTraceText] = useState(false);
    console.log(typeof (dialog.settings))
    useEffect(() => {
        if (dialog.settings) {
            const {
                topP,
                model,
                temperature,
                maxLength,

                frequencyPenalty,
                presencePenalty,
                bestOf,
                injectionStartText,
                injectionRestartText,
                showProbabilities,
                saveFinalOutput,
                traceText,
            } = JSON.parse(dialog.settings);

            console.log(topP, model)

            setModel(model || ''); // Use empty string as default if value is undefined
            setTemperature(temperature || '');
            setMaxLength(maxLength || '');
            setTopP(topP || '');
            setFrequencyPenalty(frequencyPenalty || '');
            setPresencePenalty(presencePenalty || '');
            setBestOf(bestOf || '');
            setInjectionStartText(injectionStartText || '');
            setInjectionRestartText(injectionRestartText || '');
            setShowProbabilities(showProbabilities || '');
            setSaveFinalOutput(saveFinalOutput || false);
            setTraceText(traceText || false);
        }
    }, [dialog.settings]);


    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        // You can handle saving the form data here
        console.log('Form data:', {
            model,
            temperature,
            maxLength,
            topP,
            frequencyPenalty,
            presencePenalty,
            bestOf,
            injectionStartText,
            injectionRestartText,
            showProbabilities,
            saveFinalOutput,
            traceText,
        });
        // Call the backend API to update the dialog settings
        fetch(`${API_BASE_URL}/update_dialog/${dialog.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                model,
                temperature,
                maxLength,
                topP,
                frequencyPenalty,
                presencePenalty,
                bestOf,
                injectionStartText,
                injectionRestartText,
                showProbabilities,
                saveFinalOutput,
                traceText,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Dialog settings updated successfully
                    console.log('Dialog settings updated successfully.');
                    // Optionally, you can also refresh the page to show the updated settings
                    // window.location.reload();
                } else {
                    // Handle errors, display error message, etc.
                    console.error('Failed to update dialog settings:', response);
                }
            })
            .catch((error) => {
                console.error('Error updating dialog settings:', error);
            });


        // Close the dialog box after saving
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{dialog.name} Settings</DialogTitle>
            <DialogContent>
                <div>
                    <InputLabel>Model</InputLabel>
                    <Select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="dense"
                    >
                        <MenuItem value="GPT 3">GPT 3</MenuItem>
                        <MenuItem value="GTP 3.5">GTP 3.5</MenuItem>
                        <MenuItem value="GPT-4-0613">GPT-4-0613</MenuItem>
                    </Select>
                </div>
                <TextField
                    label="Temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    type="number"
                    inputProps={{ min: 0, max: 1, step: 0.1 }}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Max Length"
                    value={maxLength}
                    onChange={(e) => setMaxLength(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Top P"
                    value={topP}
                    onChange={(e) => setTopP(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Frequency Penalty"
                    value={frequencyPenalty}
                    onChange={(e) => setFrequencyPenalty(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Presence Penalty"
                    value={presencePenalty}
                    onChange={(e) => setPresencePenalty(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Best of"
                    value={bestOf}
                    onChange={(e) => setBestOf(e.target.value)}
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Injection Start Text"
                    value={injectionStartText}
                    onChange={(e) => setInjectionStartText(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Injection Restart Text"
                    value={injectionRestartText}
                    onChange={(e) => setInjectionRestartText(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                <TextField
                    label="Show Probabilities"
                    value={showProbabilities}
                    onChange={(e) => setShowProbabilities(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                />
                {/* <FormControlLabel
                    control={
                        <Checkbox
                            checked={showProbabilities}
                            onChange={(e) => setShowProbabilities(e.target.checked)}
                        />
                    }
                    label="Show Probabilities"
                /> */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={saveFinalOutput}
                            onChange={(e) => setSaveFinalOutput(e.target.checked)}
                        />
                    }
                    label="Save Final Output"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={traceText}
                            onChange={(e) => setTraceText(e.target.checked)}
                        />
                    }
                    label="Trace Text"
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <Button onClick={handleClose} variant="outlined" style={{ marginRight: '8px' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogSettings;
