import React, { useState } from 'react';
import { Grid, Box, Typography } from '@abdt/ornament';
import { AddButton, Table, Filter } from 'components';
import { HeadCellContextProvider } from 'context/HeadCellContext.Provider';
import { HeadCell } from 'models';
import { headCells as headCellsArray } from 'utils';

export const MainPage: React.FC = () => {
    const [headCells, setHeadCells] = useState<HeadCell[]>(
        JSON.parse(localStorage.userFields) || headCellsArray
    );

    return (
        <HeadCellContextProvider value={{ headCells, setHeadCells }}>
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
                    <Filter />
                </Grid>
                <Table />
            </Grid>
        </HeadCellContextProvider>
    );
};

export default MainPage;
