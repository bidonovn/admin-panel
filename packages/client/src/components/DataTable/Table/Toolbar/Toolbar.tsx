import React from 'react';
import { Box, Typography } from '@abdt/ornament';
import { Edit, FilterFunnel } from '@abdt/icons';
import { TableColumnFromProps } from '../types';

interface ToolbarProps {
    tableColumns: TableColumnFromProps[];
    title?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({ title }) => {
    return (
        <Box width="100%" p={3} display="flex" justifyContent="space-between">
            <Typography variant="h3" component="div">
                {title}
            </Typography>
            <Box display="flex">
                <Edit />
                <FilterFunnel />
            </Box>
        </Box>
    );
};
