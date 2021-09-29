import React, { useMemo } from 'react';
import { Skeleton, TableBody, TableCell, TableRow } from '@abdt/ornament';

interface TableSkeletonBodyProps {
    rowsCount?: number;
    cellsCount: number;
}

const TableSkeletonBody: React.FC<TableSkeletonBodyProps> = ({
    rowsCount = 5,
    cellsCount = 5,
}) => {
    const rows = useMemo(() => {
        const arr = [];

        for (let i = 0; i < rowsCount; i += 1) {
            arr.push(i);
        }

        return arr;
    }, [rowsCount]);

    const cells = useMemo(() => {
        const arr = [];

        for (let i = 0; i < cellsCount; i += 1) {
            arr.push(i);
        }

        return arr;
    }, [cellsCount]);

    return (
        <TableBody key={'skelet-table'}>
            {rows?.map((_, index) => (
                <TableRow key={`${index}-skeleton`}>
                    {cells.map((_, index) => (
                        <TableCell key={`${index}-skeleton`}>
                            <Skeleton />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default React.memo(TableSkeletonBody);
