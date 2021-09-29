import React from 'react';
import {
    TableBody as OrnamentTableBody,
    TableRow as OrnamentTableRow,
    TableCell as OrnamentTableCell,
} from '@abdt/ornament';
import { TableRow } from './TableRow';
import ErrorBody from './ErrorBody';
import NoDataBody from './NoDataBody';
import SkeletonBody from './SkeletonBody';
import { TableRow as TableRowType } from '../types';

interface TableBodyProps {
    loading?: boolean;
    error?: string;
    rows: TableRowType[];
    onRowClick?: (row: TableRowType) => void;
    rowsPerPage: number;
}
const TableBodyComponent: React.FC<TableBodyProps> = ({
    loading,
    error,
    rows,
    onRowClick = () => undefined,
    rowsPerPage,
}) => {
    const emptyRows = rowsPerPage - rows.length;

    if (loading) {
        return (
            <SkeletonBody
                rowsCount={rowsPerPage}
                cellsCount={rows[0]?.cells?.length}
            />
        );
    }

    if (error) {
        return <ErrorBody />;
    }

    if (rows?.length) {
        return (
            <OrnamentTableBody>
                {rows?.map((row) => (
                    <TableRow key={row.id} row={row} onRowClick={onRowClick} />
                ))}
                {emptyRows > 0 && (
                    <OrnamentTableRow style={{ height: 41 * emptyRows }}>
                        <OrnamentTableCell colSpan={rows[0].cells.length} />
                    </OrnamentTableRow>
                )}
            </OrnamentTableBody>
        );
    }

    return <NoDataBody />;
};

export const TableBody = React.memo(TableBodyComponent);
