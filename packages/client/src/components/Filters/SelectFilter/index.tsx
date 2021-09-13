import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@abdt/ornament';
import { AppContext } from '@context/AppContext.Provider';
import { find, indexOf } from 'lodash';
import { Filter, CellOptions } from '@models';

interface SelectFilterProps {
    name: string | undefined;
    options?: CellOptions[];
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
    name,
    options,
}) => {
    const [selectValue, setSelectValue] = useState<string>('');
    const { filters, setFilters } = useContext(AppContext);

    const selectChangeHandler = ({
        target: { value },
    }: React.ChangeEvent<any>): void => {
        setSelectValue(value);
        const newArr = filters;
        let filter = find(newArr, { name });
        const index = indexOf(newArr, filter);
        if (filter) {
            filter = { ...(filter as Filter), value };
            newArr[index] = filter;
        }

        setFilters(newArr);
    };

    const fieldValue = () => {
        // @ts-ignore
        return find(filters, { name })?.value || '';
    };

    return (
        <FormControl size="small" fullWidth>
            <InputLabel>Значение фильтра</InputLabel>
            <Select
                value={selectValue || fieldValue()}
                onChange={selectChangeHandler}
            >
                {options?.map((option) => (
                    <MenuItem value={option.value} key={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectFilter;
