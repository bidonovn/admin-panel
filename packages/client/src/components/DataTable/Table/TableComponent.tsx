import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Table as OrnamentTable, TableContainer, Paper } from '@abdt/ornament';
import { TableBody } from './TableBody/TableBody';
import { TableHead } from './TableHead/TableHead';
import { Toolbar } from './Toolbar';
import { TableRow, TableCell, TableState, TableProps } from './types';
import { TablePagination } from './TablePagination';

const defaultItemsPerPageOptions = [5, 10, 15];

const TableComponent: React.FC<TableProps> = ({
    onChangeTableState = () => undefined,
    onRowClick = () => undefined,
    columns,
    rows,
    title = '',
    loading,
    error,
    pagesCount,
    currentPage,
    rowsPerPage,
    rowsPerPageOptions = defaultItemsPerPageOptions,
    totalItemsCount,
}) => {
    const [tableState, setTableState] = useState<TableState>({
        order: 'asc',
        orderBy: columns[0].field,
        filters: [],
        currentPage,
        rowsPerPage: rowsPerPage || defaultItemsPerPageOptions[0],
        hidedColumns: columns
            .filter(({ hide }) => hide)
            .map(({ field }) => field),
    });

    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        if (!isFirstRender.current) {
            onChangeTableState(tableState);
        }

        isFirstRender.current = false;
    }, [tableState]);

    const filteredColumns = useMemo(() => {
        return columns.filter((column) => {
            return !tableState.hidedColumns.includes(column.field);
        });
    }, [columns, tableState.hidedColumns]);

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
            <Toolbar
                tableColumns={columns}
                title={title}
                setTableState={setTableState}
                tableState={tableState}
            />
            <OrnamentTable aria-label="statements">
                <TableHead
                    tableColumns={filteredColumns}
                    order={tableState.order}
                    orderBy={tableState.orderBy}
                    setTableState={setTableState}
                />
                <TableBody
                    loading={loading}
                    error={error}
                    rows={enhancedRows}
                    onRowClick={onRowClick}
                    rowsPerPage={rowsPerPage || tableState?.rowsPerPage}
                />
            </OrnamentTable>
            <TablePagination
                totalItemsCount={totalItemsCount}
                currentPage={currentPage}
                pagesCount={pagesCount}
                rowsPerPageOptions={rowsPerPageOptions}
                rowsPerPage={rowsPerPage || tableState?.rowsPerPage}
                setTableState={setTableState}
                itemsCount={enhancedRows.length}
            />
        </TableContainer>
    );
};

/**
 * Таблица для отображения данных с сервера
 *
 * 🚨 Поддерживает только серверную фильтрацию 🚨
 */

export const Table = React.memo(TableComponent);
