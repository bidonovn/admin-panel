import * as React from 'react';
import {
    TableCell,
    TableHead as OrnamentTableHead,
    TableRow,
    TableSortLabel,
} from '@abdt/ornament';
import { TableColumnFromProps, TableState } from '../types';

interface TableHeadProps {
    tableColumns: TableColumnFromProps[];
    orderBy: string;
    order: 'asc' | 'desc';
    setTableState: React.Dispatch<React.SetStateAction<TableState>>;
}

const TableHeadComponent: React.FC<TableHeadProps> = ({
    tableColumns,
    orderBy,
    order,
    setTableState,
}) => {
    const createSortHandler = (field: string) => () => {
        setTableState((prevState) => {
            return {
                ...prevState,
                orderBy: field,
                order: prevState.order === 'asc' ? 'desc' : 'asc',
            };
        });
    };

    return (
        <OrnamentTableHead>
            <TableRow>
                {tableColumns.map(({ field, headerName }) => (
                    <TableCell
                        key={field}
                        align="left"
                        sortDirection={orderBy === field ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === field}
                            direction={orderBy === field ? order : 'asc'}
                            onClick={createSortHandler(field)}
                        >
                            {headerName}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </OrnamentTableHead>
    );
};

export const TableHead = React.memo(TableHeadComponent);
