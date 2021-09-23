import React from 'react';
import { Chip, Box } from '@abdt/ornament';
import { AppContext } from '@context/AppContext.Provider';
import { labelFormatter } from './utils';

export const FiltersList: React.FC = () => {
    const { filters } = React.useContext(AppContext);

    const filtersWithValue = filters.filter(
        (filterItem) => filterItem.value || filterItem.date
    );

    return (
        <Box display="flex" flexWrap="wrap">
            {filtersWithValue.map((filter) => (
                <Box mr={1}>
                    <Chip
                        label={`${filter.label}: ${labelFormatter(
                            filter.name,
                            filter.value || filter.date
                        )}`}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default FiltersList;