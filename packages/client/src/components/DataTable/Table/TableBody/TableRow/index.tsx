import React, { FC, useMemo } from 'react';
import { TableRow, TableCell } from '@abdt/ornament';
import cn from 'classnames';
import useStyles from './style';
import { tableHelper } from '../../table-helper';
import { TableRow as TableRowType } from '../../types';

interface TableRowProps {
    row: TableRowType;
}

const TableRowComponent: FC<TableRowProps> = ({ row }) => {
    const { cells } = row;
    const classes = useStyles();

    return (
        <TableRow className={cn(classes.tableBody)}>
            {cells.map((cell, key) => (
                <TableCell key={key}>{cell.value}</TableCell>
            ))}
        </TableRow>
    );
};

export default React.memo(TableRowComponent);
