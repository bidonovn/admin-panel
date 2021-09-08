import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Paper, Box, Typography } from '@abdt/ornament';
import TableBody from './TableBody';
import TableHead from './TableHead';
import PaginationComponent from '../Pagination';
import CountPerPage from '../CountPerPage';
import { useTransactionsList } from 'hooks';
import { Order, Transaction } from 'models';
import { AppContext } from 'context/AppContext.Provider';

const TableComponent: React.FC = () => {
    const { query, setQuery } = React.useContext(AppContext);
    const { loading, error, data, get } = useTransactionsList();
    const { items, count, current, pages } = data;
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Transaction>('date');

    /** Сортировка */
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Transaction
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setQuery({
            ...query,
            order: isAsc ? 'desc' : 'asc',
            orderBy: property,
        });
    };

    useEffect(() => {
        get(query);
    }, [query]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="statements">
                    <TableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody
                        loading={loading}
                        error={error}
                        items={data.items}
                    />
                </Table>
            </TableContainer>
            <Box
                my={3}
                display="flex"
                justifyContent="space-between"
                width="100%"
            >
                <Typography align="right" component="div" variant="caption">
                    Записей на странице {items.length}
                    {' из '}
                    {count}
                </Typography>
                <Box display="flex" flexWrap="no-wrap">
                    <Box mr={3}>
                        <CountPerPage />
                    </Box>
                    <PaginationComponent pageNumber={current} count={pages} />
                </Box>
            </Box>
        </>
    );
};

export default React.memo(TableComponent);
