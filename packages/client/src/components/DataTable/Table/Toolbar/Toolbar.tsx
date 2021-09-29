import React from 'react';
import { Box, Typography } from '@abdt/ornament';

import { TableColumnFromProps, TableState } from '../types';
import { HideColumnsFilter } from './HideColumnsFilter';
import { ValueColumnsFilter } from './ValueColumnsFilter';

interface ToolbarProps {
    tableColumns: TableColumnFromProps[];
    title?: string;
    setTableState: React.Dispatch<React.SetStateAction<TableState>>;
    tableState: TableState;
}

export const Toolbar: React.FC<ToolbarProps> = ({
    title,
    tableColumns,
    setTableState,
    tableState,
}) => {
    return (
        <Box width="100%" p={3} display="flex" justifyContent="space-between">
            <Typography variant="h3" component="div">
                {title}
            </Typography>
            <Box display="flex">
                <ValueColumnsFilter
                    tableColumns={tableColumns}
                    setTableState={setTableState}
                    filters={tableState.filters}
                />
                <HideColumnsFilter
                    tableColumns={tableColumns}
                    setTableState={setTableState}
                    hidedColumns={tableState.hidedColumns}
                />
            </Box>
        </Box>
    );
};
