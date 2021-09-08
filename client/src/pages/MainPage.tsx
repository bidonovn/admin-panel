import React, { useState } from 'react';
import { Grid, Box, Typography } from '@abdt/ornament';
import { AddButton, Table, Actions } from 'components';
import { AppContextProvider } from 'context/AppContext.Provider';
import { HeadCell, TransactionsQuery } from 'models';
import { headCells as headCellsArray } from 'utils';

export const MainPage: React.FC = () => {
    const [headCells, setHeadCells] = useState<HeadCell[]>(
        JSON.parse(localStorage.userFields) || headCellsArray
    );
    const [filters, setFilters] = useState<{ [key: string]: any }>({});
    const [query, setQuery] = useState<TransactionsQuery>({});

    return (
        <AppContextProvider
            value={{
                headCells,
                setHeadCells,
                filters,
                setFilters,
                query,
                setQuery,
            }}
        >
            <Grid container spacing={5}>
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
                <Table />
            </Grid>
        </AppContextProvider>
    );
};

export default MainPage;
