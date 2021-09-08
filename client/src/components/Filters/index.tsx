import React from 'react';
import {
    Select,
    Grid,
    MenuItem,
    Box,
    FormControl,
    InputLabel,
    TextField,
} from '@abdt/ornament';
import { map } from 'lodash';
import { AppContext } from 'context/AppContext.Provider';

export const Filters: React.FC = () => {
    const { headCells, filters } = React.useContext(AppContext);

    return (
        <Box my={2}>
            {map(filters, () => (
                <Grid container xs={6} spacing={2}>
                    <Grid item xs={6}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Выберите фильтр</InputLabel>
                            <Select>
                                {headCells.map((headCell) => (
                                    <MenuItem
                                        value={headCell.name}
                                        key={headCell.name}
                                    >
                                        {headCell.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Значение"
                            placeholder="Введите значение фильтра"
                            size="small"
                        ></TextField>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};
