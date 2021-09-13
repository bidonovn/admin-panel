import React from 'react';
import {
    Select,
    Grid,
    MenuItem,
    Box,
    FormControl,
    InputLabel,
    IconButton,
    Button,
} from '@abdt/ornament';
import { Bin } from '@abdt/icons';
import { find } from 'lodash';
import { AppContext } from '@context/AppContext.Provider';
import SearchField from './SearchField';

export const Filters: React.FC = () => {
    const { userCells, filters, setFilters, query, setQuery } =
        React.useContext(AppContext);

    /** Выбор фильтра */
    const selectFilterHandler =
        (index: number) =>
        ({ target: { value } }: React.ChangeEvent<any>) => {
            const newArr = [...filters];
            const cell = find(userCells, { name: value });
            if (cell) {
                newArr[index] = cell;
            }
            setFilters(newArr);
        };

    /** Удаление фильтра */
    const deleteFilterHandler = (index: number) => () => {
        const newArr = filters;
        newArr.splice(index, 1);
        setFilters([...newArr]);
    };

    /** Применение фильтров */
    const acceptFilters = () => {
        setQuery({ ...query, filters });
    };

    /** Сброс фильтров */
    const resetFilters = () => {
        setFilters([]);
        setQuery({ ...query, filters: [] });
    };

    return (
        <>
            <Box my={2}>
                {filters.map((filter, index) => (
                    <Grid container spacing={2} key={`${filter.name}_${index}`}>
                        <Grid item xs={3}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>Выберите фильтр</InputLabel>
                                <Select
                                    onChange={selectFilterHandler(index)}
                                    value={filter?.name}
                                >
                                    {userCells.map((userCell) => (
                                        <MenuItem
                                            value={userCell.name}
                                            key={userCell.name}
                                            disabled={
                                                !!find(filters, {
                                                    name: userCell.name,
                                                })
                                            }
                                        >
                                            {userCell.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <SearchField
                                name={filter?.name}
                                type={filter?.filterType}
                                options={filter?.options}
                            />
                        </Grid>
                        <Grid xs={1}>
                            <IconButton>
                                <Bin
                                    color="#00b2a9"
                                    onClick={deleteFilterHandler(index)}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </Box>
            {!!filters.length && (
                <Box my={2} display="flex">
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={acceptFilters}
                    >
                        Применить фильтры
                    </Button>
                    <Button variant="text" size="small" onClick={resetFilters}>
                        Сбросить фильтры
                    </Button>
                </Box>
            )}
        </>
    );
};
