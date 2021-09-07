import React, { FC } from 'react';
import { TableCell, TableRow, Typography } from '@abdt/ornament';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import useStyles from './style';
import { Transaction, transactionsTypesLabels } from 'models';
import { formatDateWithoutTime } from 'utils';

const Empty = () => (
    <Typography component="div" variant="body2">
        —
    </Typography>
);

interface Props {
    isLoading: boolean;
    id: string;
}

const TableRowComponent: FC<Transaction & Props> = ({
    sum,
    number,
    user,
    date,
    type,
    isLoading,
    id,
}) => {
    const classes = useStyles();
    const history = useHistory();

    const tableRowClickHandler = React.useCallback(
        () => history.push(`/transaction/${id}`),
        [history]
    );

    return (
        <TableRow
            className={cn(classes.tableBody, isLoading && classes.isUpdate)}
            onClick={tableRowClickHandler}
        >
            <TableCell scope="row">
                <Typography component="div" variant="body2" noWrap bold>
                    <span>{number}</span>
                </Typography>
            </TableCell>
            <TableCell scope="row">{user || <Empty />}</TableCell>
            <TableCell scope="row">
                <Typography bold component="div" variant="body2" noWrap>
                    {transactionsTypesLabels[type]}
                </Typography>
            </TableCell>
            <TableCell scope="row">
                <Typography component="div" variant="body2" noWrap>
                    <span>{formatDateWithoutTime(date)}</span>
                </Typography>
            </TableCell>
            <TableCell scope="row">{sum || 0}</TableCell>
        </TableRow>
    );
};

export default React.memo(TableRowComponent);
