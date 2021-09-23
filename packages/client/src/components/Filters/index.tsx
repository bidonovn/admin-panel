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
    Tooltip,
} from '@abdt/ornament';
import { Plus, Minus } from '@abdt/icons';
import { find } from 'lodash';
import { AppContext } from '@context/AppContext.Provider';
import SearchField from './SearchField';

interface FiltersProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const Filters: React.FC<FiltersProps> = ({ open, setOpen }) => {
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

    /** Добавление фильтра */
    const addFilterHandler = () =>
        setFilters([...filters, userCells[filters.length]]);

    /** Удаление фильтра */
    const deleteFilterHandler = (index: number) => () => {
        if (filters.length === 1) {
            return;
        }

        const newArr = filters;
        newArr.splice(index, 1);
        setFilters([...newArr]);
    };

    /** Применение фильтров */
    const acceptFilters = () => {
        setQuery({ ...query, filters });
        setOpen(!open);
    };

    /** Сброс фильтров */
    const resetFilters = () => {
        setFilters([userCells[0]]);
        setQuery({ ...query, filters: [] });
    };

    const disabled = Object.keys(filters).length === userCells.length;

    return (
        <>
            {open && (
                <>
                    <Box my={2}>
                        {filters.map((filter, index) => (
                            <Grid
                                container
                                spacing={2}
                                key={`${filter.name}_${index}`}
                            >
                                <Grid item xs={4}>
                                    <Box display="flex" alignItems="center">
                                        <Box mr={2}>
                                            <IconButton
                                                color="secondary"
                                                onClick={addFilterHandler}
                                                disabled={disabled}
                                            >
                                                <Plus />
                                            </IconButton>
                                        </Box>
                                        <FormControl size="small" fullWidth>
                                            <InputLabel>
                                                Выберите фильтр
                                            </InputLabel>
                                            <Select
                                                onChange={selectFilterHandler(
                                                    index
                                                )}
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
                                    </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Box display="flex" alignItems="center">
                                        <SearchField
                                            name={filter?.name}
                                            type={filter?.filterType}
                                            options={filter?.options}
                                        />
                                        <Box ml={2}>
                                            <Tooltip
                                                title="Удалить фильтр"
                                                placement="right-end"
                                            >
                                                <IconButton
                                                    color="secondary"
                                                    onClick={deleteFilterHandler(
                                                        index
                                                    )}
                                                >
                                                    <Minus />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                    <Box my={4} display="flex">
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={acceptFilters}
                        >
                            Применить фильтры
                        </Button>
                        <Box mx={2} />
                        <Button
                            variant="text"
                            size="small"
                            onClick={resetFilters}
                        >
                            Сбросить фильтры
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};
