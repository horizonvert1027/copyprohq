import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const RunOutcome = ({ responseData }) => {
    return (
        <Paper className="p-4 mt-4 w-5/6 mx-auto">
            <Typography variant="h6" gutterBottom>
                Run Outcome
            </Typography>
            <Typography variant="body2">
                <Box
                    component="pre"
                    className="border border-gray-400 rounded-md p-2 bg-gray-100 overflow-x-auto"
                >
                    <div style={{ minWidth: '70%', overflowX: 'auto' }}>
                        {responseData}
                    </div>
                </Box>
            </Typography>
            <div className="mt-4">
                <CopyToClipboard text={responseData}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Copy to Clipboard
                    </button>
                </CopyToClipboard>
            </div>
        </Paper>
    );
};

export default RunOutcome;