import React, { useState } from 'react';
import { Grid, Box, Typography } from '@abdt/ornament';
import { AddButton, Table, Actions, FiltersList } from '@components';
import { AppContextProvider } from '@context/AppContext.Provider';
import { HeadCell, TransactionsQuery, Filter } from '@models';
import { headCells as headCellsArray } from '@utils';

export const MainPage: React.FC = () => {
    const [userCells, setUserCells] = useState<HeadCell[]>(
        localStorage?.userFields
            ? JSON.parse(localStorage?.userFields)
            : headCellsArray
    );

    const [filters, setFilters] = useState<Filter[]>([userCells[0]]);
    const [query, setQuery] = useState<TransactionsQuery>({});

    return (
        <AppContextProvider
            value={{
                userCells,
                setUserCells,
                filters,
                setFilters,
                query,
                setQuery,
            }}
        >
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Box my={4} display="flex" justifyContent="space-between">
                        <Typography variant="h2" component="h1" gutterBottom>
                            Страница администратора
                        </Typography>
                        <AddButton />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Actions />
                </Grid>
                <Grid item xs={12}>
                    <FiltersList />
                </Grid>
                <Table />
            </Grid>
        </AppContextProvider>
    );
};

export default MainPage;
