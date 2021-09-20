import React, { useMemo, useState } from 'react';
import {
    Table,
    TableContainer,
    Paper,
    Box,
    Typography,
    Pagination,
} from '@abdt/ornament';
import TableBody from './TableBody';
import TableHead from './TableHead';
import { Toolbar } from './Toolbar';
import {
    TableColumnFromProps,
    TableRowFromProps,
    TableRow,
    TableCell,
    FilterState,
} from './types';

export interface TableProps {
    columns: TableColumnFromProps[];
    rows: TableRowFromProps[];
    loading?: boolean;
    error?: string;
    title?: string;
}

const TableComponent: React.FC<TableProps> = ({
    columns,
    rows,
    title,
    loading,
    error,
}) => {
    const [filterState, setFilterState] = useState<FilterState>({
        order: 'asc',
        orderBy: columns[0].field,
        hidedColumns: [],
    });

    const filteredColumns = useMemo(
        () => columns.filter((column) => !column?.hide),
        [columns]
    );

    const enhancedRows: TableRow[] = useMemo(() => {
        return rows.map((row) => {
            const cells: TableCell[] = filteredColumns.map((column) => {
                const value = row?.[column?.field];

                return {
                    value,
                    ...column,
                } as TableCell;
            });

            return {
                id: row.id,
                cells,
            };
        });
    }, [rows, filteredColumns]);

    return (
        <TableContainer component={Paper}>
            <Toolbar tableColumns={filteredColumns} title={title} />
            <Table aria-label="statements">
                <TableHead
                    tableColumns={filteredColumns}
                    order={filterState.order}
                    orderBy={filterState.orderBy}
                    setFilterState={setFilterState}
                />
                <TableBody
                    loading={loading}
                    error={error}
                    rows={enhancedRows}
                />
            </Table>
            {/* <Box
                my={3}
                px={3}
                display="flex"
                justifyContent="space-between"
                width="100%"
            >
                <Typography align="right" component="div" variant="caption">
                    Записей на странице {items.length}
                    {' из '}
                    {totalItemsCount}
                </Typography>
                <Box display="flex" flexWrap="no-wrap">
                    <Box mr={3}>
                        <CountPerPage />
                    </Box>
                    <Pagination
                        onChange={onChangePage}
                        page={currentPage}
                        count={totalPages}
                    />
                </Box>
            </Box> */}
        </TableContainer>
    );
};

export default React.memo(TableComponent);
