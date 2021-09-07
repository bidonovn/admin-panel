import React from 'react';
import { TableCell, Typography } from '@abdt/ornament';

interface TableCellProps {
    children?: React.ReactNode;
}

const TableCellComponent: React.FC<TableCellProps> = ({ children }) => {
    return (
        <TableCell scope="row">
            <Typography component="div" variant="body2" noWrap bold>
                <span>{children}</span>
            </Typography>
        </TableCell>
    );
};

export default React.memo(TableCellComponent);
