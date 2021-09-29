import * as React from 'react';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@abdt/ornament';
import { Transaction, Order } from '@models';
import { AppContext } from '@context/AppContext.Provider';
import useStyles from './style';

interface TableHeadProps {
    orderBy: keyof Transaction;
    order: Order;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Transaction
    ) => void;
}

const TableHeadComponent: React.FC<TableHeadProps> = ({
    order,
    orderBy,
    onRequestSort,
}) => {
    const classes = useStyles();
    const { userCells } = React.useContext(AppContext);

    const createSortHandler =
        (property: keyof Transaction) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const activeHeadCells = React.useMemo(
        () => userCells.filter((userCell) => userCell.isActive),
        [userCells]
    );

    return (
        <TableHead>
            <TableRow>
                {activeHeadCells.map((headCell) => (
                    <TableCell
                        key={headCell.name}
                        align="left"
                        // @ts-ignore
                        sortDirection={
                            orderBy === headCell.name ? order : false
                        }
                    >
                        <TableSortLabel
                            active={orderBy === headCell.name}
                            direction={
                                orderBy === headCell.name ? order : 'asc'
                            }
                            onClick={createSortHandler(headCell.name)}
                        >
                            {headCell.label}
                            {orderBy === headCell.name ? (
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
