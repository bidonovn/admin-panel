import React, { useMemo } from 'react';
import { TableBody } from '@abdt/ornament';
import { Transaction } from '@models';
import TableRow from './TableRow';
import ErrorBody from './ErrorBody';
import SkeletonBody from './SkeletonBody';
import NoDataBody from './NoDataBody';
import { TableRow as TableRowType } from '../types';

interface TableBodyProps {
    loading?: boolean;
    error?: string;
    rows: TableRowType[];
}
const TableBodyComponent: React.FC<TableBodyProps> = ({
    loading,
    error,
    rows,
}) => {
    if (loading) {
        return <SkeletonBody />;
    }

    if (error) {
        return <ErrorBody />;
    }

    if (rows?.length) {
        return (
            <TableBody>
                {rows?.map((row) => (
                    <TableRow key={row.id} row={row} />
                ))}
            </TableBody>
        );
    }

    return <NoDataBody />;
};

export default React.memo(TableBodyComponent);
