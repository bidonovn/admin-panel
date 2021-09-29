import React, { FC, useCallback } from 'react';
import { TableRow as TableRowOrnament, TableCell } from '@abdt/ornament';
import cn from 'classnames';
import useStyles from './style';
import { formattingCellValueByType } from './utils';
import { TableRow as TableRowType } from '../../types';

interface TableRowProps {
    row: TableRowType;
    onRowClick?: (row: TableRowType) => void;
}

const TableRowComponent: FC<TableRowProps> = ({
    row,
    onRowClick = () => undefined,
}) => {
    const { cells } = row;
    const classes = useStyles();

    const handleRowClick = useCallback(() => {
        onRowClick(row);
    }, []);

    return (
        <TableRowOrnament
            className={cn(classes.tableBody)}
            onClick={handleRowClick}
        >
            {cells.map((cell, key) => (
                <TableCell key={key}>
                    {formattingCellValueByType(
                        cell?.type || 'string',
                        cell?.value
                    )}
                </TableCell>
            ))}
        </TableRowOrnament>
    );
};

export const TableRow = React.memo(TableRowComponent);
