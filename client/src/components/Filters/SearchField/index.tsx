import React from 'react';
import { CellOptions } from 'models';
import TextFilter from '../TextFilter';
import SelectFilter from '../SelectFilter';
import DateFilter from '../DateFilter';

interface SearchFieldProps {
    name: string | undefined;
    type: 'text' | 'date' | 'enum' | 'number' | undefined;
    options?: CellOptions[];
}

export const SearchField: React.FC<SearchFieldProps> = ({
    name,
    type,
    options,
}) => {
    const renderField = () => {
        switch (type) {
            case 'text':
            case 'number':
                return <TextFilter name={name} />;
            case 'date':
                return <DateFilter name={name} />;
            case 'enum':
                return <SelectFilter name={name} options={options} />;
            default:
                return <TextFilter name={name} />;
        }
    };

    return <>{renderField()}</>;
};

export default SearchField;
