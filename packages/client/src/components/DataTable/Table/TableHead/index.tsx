import * as React from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Link,
} from '@abdt/ornament';
import { Widget } from '@abdt/icons';
import { TableColumnFromProps, FilterState } from '../types';
import useStyles from './style';

interface TableHeadProps {
    tableColumns: TableColumnFromProps[];
    orderBy: string;
    order: 'asc' | 'desc';
    setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}

const TableHeadComponent: React.FC<TableHeadProps> = ({
    tableColumns,
    orderBy,
    order,
    setFilterState,
}) => {
    const classes = useStyles();
    const createSortHandler =
        (field: string) => (event: React.MouseEvent<unknown>) => {
            setFilterState((prevState) => {
                return {
                    ...prevState,
                    orderBy: field,
                    order: prevState.order === 'asc' ? 'desc' : 'asc',
                };
            });
        };

    return (
        <TableHead>
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
                            {orderBy === field ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default React.memo(TableHeadComponent);
