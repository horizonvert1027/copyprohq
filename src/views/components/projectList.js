import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const ProjectList = ({ projects }) => {
    const navigate = useNavigate();

    const handleProjectClick = (projectId) => {
        // Navigate to project details page
        // navigate(`/projects/${projectId}`);
    };

    return (
        <div
            style={{ cursor: 'pointer' }}
            className="grid grid-cols-1 gap-4">
            {projects.map((project) => (
                <Card key={project.id} onClick={() => {
                    handleProjectClick(project.id)
                }}>
                    <CardContent>
                        <Typography variant="h6">{project.name}</Typography>
                        {/* Other project details */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ProjectList;