import React from 'react';
import { Grid, Box, Typography } from '@abdt/ornament';
import { AddButton, Table, Filter } from 'components';

export const MainPage: React.FC = () => (
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
);

export default MainPage;
