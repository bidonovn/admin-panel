import React, { useState, useMemo } from 'react';
import { Box, IconButton, Button, Grid } from '@abdt/ornament';
import { Edit } from '@abdt/icons';
import { find, uniqueId, pick } from 'lodash';
import { Popover } from '@material-ui/core';
import {
    TableColumnFromProps,
    TableState,
    FilterItem as FilterItemType,
} from '../../types';
import { FilterItem } from './FilterItem';

interface TableHeadProps {
    tableColumns: TableColumnFromProps[];
    setTableState: React.Dispatch<React.SetStateAction<TableState>>;
    filters: TableState['filters'];
}

export const ValueColumnsFilter: React.FC<TableHeadProps> = ({
    tableColumns,
    filters,
    setTableState,
}) => {
    const availableFilterFields = useMemo(() => {
        return tableColumns.filter(
            (column) => !filters.some((filter) => column.field === filter.field)
        );
    }, [tableColumns, filters]);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const isEmptyFilters = filters.length === 0;
    const hasAvailableFilters = availableFilterFields.length !== 0;

    const changeFilterValue = (id: string, value: FilterItemType['value']) => {
        setTableState(({ filters, ...otherState }) => {
            const newFilters = filters.map((filterItem) => {
                if (id === filterItem.id) {
                    return {
                        ...filterItem,
                        value,
                    };
                }
                return filterItem;
            });

            return {
                ...otherState,
                filters: newFilters,
            };
        });
    };

    const addFilter = () => {
        if (availableFilterFields.length === 0) return;

        const {
            field,
            type = 'string',
            headerName,
        } = availableFilterFields?.[0];

        const newFilterItem = {
            id: uniqueId(),
            value: null,
            field,
            type,
            headerName,
        };

        setTableState(({ filters, ...otherState }) => {
            return {
                ...otherState,
                filters: [...filters, newFilterItem],
            };
        });
    };

    const handleClickResetButton = () => {
        setTableState((state) => {
            return {
                ...state,
                filters: [],
            };
        });
    };

    const changeFilterField = (id: string, field: string) => {
        setTableState(({ filters, ...otherState }) => {
            const newFilters = filters.map((filterItem) => {
                if (id === filterItem.id) {
                    const findField = find(tableColumns, {
                        field,
                    });

                    const newFilterField = pick(findField, [
                        'field',
                        'id',
                        'headerName',
                        'type',
                    ]);

                    return {
                        ...filterItem,
                        ...newFilterField,
                        type: newFilterField?.type || 'string',
                        value: '',
                    };
                }
                return filterItem;
            });

            return {
                ...otherState,
                filters: newFilters,
            };
        });
    };

    const deleteFilterField = (id: string) => {
        setTableState(({ filters, ...otherState }) => {
            const newFilters = filters.filter(
                (filterItem) => id !== filterItem.id
            );

            return {
                ...otherState,
                filters: newFilters,
            };
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    return (
        <>
            <Popover
                open={!!anchorEl}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                id={`${!!anchorEl}`}
            >
                <Box width="400px" p={4}>
                    <Grid
                        container
                        direction="column"
                        spacing={4}
                        alignItems="center"
                    >
                        {filters.map((filterItem) => {
                            return (
                                <Grid item container key={filterItem.id}>
                                    <FilterItem
                                        filterItem={filterItem}
                                        filterFields={availableFilterFields}
                                        onChangeFilterField={changeFilterField}
                                        onChangeValue={changeFilterValue}
                                        onDeleField={deleteFilterField}
                                    />
                                </Grid>
                            );
                        })}
                        <Grid item container spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={handleClickResetButton}
                                    fullWidth
                                    disabled={isEmptyFilters}
                                >
                                    Сбросить фильтры
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    size="small"
                                    disabled={!hasAvailableFilters}
                                    onClick={addFilter}
                                    fullWidth
                                >
                                    Добавить фильтр
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
            <IconButton onClick={handleButtonClick}>
                <Edit />
            </IconButton>
        </>
    );
};
