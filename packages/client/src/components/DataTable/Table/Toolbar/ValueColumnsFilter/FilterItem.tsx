import React, { useMemo } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    IconButton,
} from '@abdt/ornament';
import { Bin } from '@abdt/icons';
import {
    ColumnValueType,
    FilterItem as FilterItemType,
    TableColumnFromProps,
    DateRange,
} from '../../types';
import { DateRangeFilter } from './DateRangeFilter';

interface FilterItemProps {
    filterItem: FilterItemType;
    filterFields: TableColumnFromProps[];
    onChangeFilterField: (id: string, field: FilterItemType['field']) => void;
    onChangeValue: (id: string, value: FilterItemType['value']) => void;
    onDeleField: (id: string) => void;
}

export const FilterItem: React.FC<FilterItemProps> = (props) => {
    const {
        onChangeFilterField,
        onChangeValue,
        onDeleField,
        filterItem,
        filterFields,
    } = props;

    const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('value', e.target.value);
        onChangeValue(filterItem.id, e.target.value);
    };

    const handleFilterFieldChange = (
        e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
    ) => {
        onChangeFilterField(filterItem.id, e.target.value as string);
    };

    const handleDateRangeField = (value: DateRange) => {
        onChangeValue(filterItem.id, value);
    };

    const handleClickDeleteFilterButton = () => onDeleField(filterItem.id);

    const FilterComponent = useMemo(() => {
        switch (filterItem.type) {
            case ColumnValueType.date:
                return (
                    <DateRangeFilter
                        value={filterItem.value as DateRange}
                        onChange={handleDateRangeField}
                    />
                );
            case ColumnValueType.number:
            case ColumnValueType.string:
            default:
                return (
                    <TextField
                        label="Значение"
                        fullWidth
                        size="small"
                        type={
                            filterItem.type === ColumnValueType.number
                                ? 'number'
                                : 'text'
                        }
                        onChange={onChangeTextField}
                        value={filterItem.value || ''}
                    />
                );
        }
    }, [filterItem]);

    return (
        <Grid item container direction="column" spacing={1}>
            <Grid item>
                <FormControl size="small" fullWidth>
                    <InputLabel>Колонка</InputLabel>
                    <Select
                        onChange={handleFilterFieldChange}
                        value={filterItem?.field}
                        fullWidth
                        disabled={filterFields.length === 0}
                    >
                        <MenuItem value={filterItem?.field}>
                            {filterItem.headerName}
                        </MenuItem>
                        {filterFields.map(({ headerName, field }) => (
                            <MenuItem value={field} key={field}>
                                {headerName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item container direction="row" justifyContent="space-between">
                <Grid item xs={10}>
                    {FilterComponent}
                </Grid>
                <Grid item container xs={2} justifyContent="flex-end">
                    <IconButton onClick={handleClickDeleteFilterButton}>
                        <Bin />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};
