import React, { useMemo, useCallback, useRef } from 'react';
import { useAxios } from '@axios/config';
import { TransactionsResponse } from '@models';
import { isEqual } from 'lodash';
import {
    Table,
    TableColumnFromProps,
    TableProps,
    TableState,
    DateRange,
    FilterItem,
} from './Table';

const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
        field: 'number',
        headerName: 'Номер транзакции',
        type: 'number',
    },
    {
        field: 'user',
        headerName: 'Клиент',
    },
    {
        field: 'sum',
        headerName: 'Сумма транзакции',
        type: 'number',
    },
    {
        field: 'type',
        headerName: 'Тип транзакции',
    },
    {
        field: 'date',
        headerName: 'Дата транзакции',
        type: 'date',
    },
] as TableColumnFromProps[];

export const DataTable: React.FC = () => {
    const [{ data, loading, error }, refetch] = useAxios<TransactionsResponse>({
        url: '/api/transactions/list',
        method: 'POST',
        data: {
            query: {},
        },
    });

    const tableStateRef = useRef<Omit<TableState, 'hidedColumns'> | null>(null);

    const tableRows = useMemo(() => {
        return (
            data?.items.map(({ _id, date, number, type, user, sum }) => ({
                id: _id,
                date,
                number,
                type: type === 'minus' ? 'Снятие' : 'Пополнение',
                user,
                sum,
            })) || []
        );
    }, [data]);

    const handleRowClick: TableProps['onRowClick'] = useCallback((row) => {
        console.log(row);
    }, []);

    const handleChangeTableState = useCallback(
        ({ hidedColumns, ...otherTableState }: TableState) => {
            const { current: prevTableState } = tableStateRef;

            const convertedTableState = {
                ...otherTableState,
                filters: otherTableState.filters.filter(
                    (filterItem: FilterItem) => !!filterItem.value
                ),
            };

            if (isEqual(prevTableState, convertedTableState)) return;

            console.log('convertedTableState', convertedTableState);

            refetch({
                data: {
                    query: {
                        limit: convertedTableState.rowsPerPage,
                        page: convertedTableState.currentPage,
                        order: convertedTableState.order,
                        orderBy:
                            convertedTableState.orderBy === 'id'
                                ? '_id'
                                : convertedTableState.orderBy,
                        filters: convertedTableState?.filters.map(
                            ({ field, value, type }) => {
                                if (type === 'date') {
                                    const { start = '', end = '' } =
                                        (value as DateRange) || {};

                                    return {
                                        name: field,
                                        filterType: type,
                                        date: {
                                            startDate: start,
                                            endDate: end,
                                        },
                                    };
                                }

                                return { name: field, value };
                            }
                        ),
                    },
                },
            }).catch((e) => console.error(e));

            tableStateRef.current = convertedTableState;
        },
        []
    );

    return (
        <Table
            currentPage={data?.current || 1}
            pagesCount={data?.pages || 1}
            totalItemsCount={data?.count || 0}
            onRowClick={handleRowClick}
            onChangeTableState={handleChangeTableState}
            rows={tableRows}
            columns={columns}
            error={error?.message}
            loading={loading}
        />
    );
};

export default DataTable;
