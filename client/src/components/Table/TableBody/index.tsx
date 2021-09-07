import React from 'react';
import { TableBody } from '@abdt/ornament';
import TableRow from './TableRow';
import ErrorBody from './ErrorBody';
import SkeletonBody from './SkeletonBody';
import NoDataBody from './NoDataBody';
import { Transaction } from 'models';

interface TableBodyProps {
    loading: boolean;
    error: string | undefined;
    items: Transaction[];
}
const TableBodyComponent: React.FC<TableBodyProps> = ({
    loading,
    error,
    items,
}) => {
    if (loading) {
        return <SkeletonBody />;
    }

    if (error) {
        return <ErrorBody />;
    }

    if (items?.length) {
        return (
            <TableBody>
                {items?.map((item) => (
                    <TableRow
                        key={item.number}
                        {...item}
                        // @ts-ignore
                        id={item._id}
                        isLoading={loading}
                    />
                ))}
            </TableBody>
        );
    }

    return <NoDataBody />;
};

export default React.memo(TableBodyComponent);
