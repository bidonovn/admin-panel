import React, { useState, useContext } from 'react';
import { TextField } from '@abdt/ornament';
import { AppContext } from 'context/AppContext.Provider';
import { find, indexOf } from 'lodash';
import { Filter } from 'models';

interface TextFilterProps {
    name: string | undefined;
}

export const TextFilter: React.FC<TextFilterProps> = ({ name }) => {
    const [textFieldValue, setTextFieldValue] = useState<string>('');
    const { filters, setFilters } = useContext(AppContext);

    const textFieldOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value);
        const newArr = filters;
        let filter = find(newArr, { name });
        const index = indexOf(newArr, filter);
        if (filter) {
            filter = { ...(filter as Filter), value: event.target.value };
            newArr[index] = filter;
        }

        setFilters(newArr);
    };

    const fieldValue = () => {
        // @ts-ignore
        return find(filters, { name })?.value || '';
    };

    return (
        <TextField
            label="Значение"
            fullWidth
            name={name}
            size="small"
            onChange={textFieldOnChange}
            value={textFieldValue || fieldValue()}
        />
    );
};

export default TextFilter;
