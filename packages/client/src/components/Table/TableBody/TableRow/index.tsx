import React, { FC } from 'react';
import { TableRow } from '@abdt/ornament';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { Transaction } from '@models';
import { AppContext } from '@context/AppContext.Provider';
import useStyles from './style';
import TableCell from '../../TableCell';
import { tableHelper } from '../../table-helper';

interface Props {
    isLoading: boolean;
    id: string;
}

const TableRowComponent: FC<Transaction & Props> = ({ ...props }) => {
    const { userCells } = React.useContext(AppContext);

    const classes = useStyles();
    const history = useHistory();

    const tableRowClickHandler = React.useCallback(
        () => history.push(`/transaction/${props.id}`),
        [history]
    );

    const activeHeadCells = React.useMemo(
        () => userCells.filter((userCell) => userCell.isActive),
        [userCells]
    );

    return (
        <TableRow
            className={cn(
                classes.tableBody,
                props.isLoading && classes.isUpdate
            )}
            onClick={tableRowClickHandler}
        >
            {activeHeadCells.map((activeHeadCell) => (
                <TableCell key={activeHeadCell.name}>
                    {tableHelper(
                        activeHeadCell.name,
                        props[activeHeadCell.name]
                    )}
                </TableCell>
            ))}
        </TableRow>
    );
};

export default React.memo(TableRowComponent);
