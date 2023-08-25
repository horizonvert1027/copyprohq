import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

const ResizableTextarea = () => {
    const [textareaHeight, setTextareaHeight] = useState(100);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsResizing(true);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            const newHeight = textareaHeight + e.movementY;
            setTextareaHeight(newHeight);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isResizing]);

    return (
        <div className="relative w-full">
            <textarea
                className="resize-y w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                style={{ height: textareaHeight }}
            />

            {/* Resize indicator */}
            <div
                className="absolute bottom-0 right-0 w-6 h-6 cursor-pointer select-none flex items-center justify-center"
                onMouseDown={handleMouseDown}
            >
                {/* <DragHandleIcon fontSize="small" /> */}
            </div>
        </div>
    );
};

export default ResizableTextarea;


