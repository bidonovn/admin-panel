import React from 'react';
import { Box, Button } from '@abdt/ornament';
import { Plus, List } from '@abdt/icons';

export const Filter: React.FC = () => {
    return (
        <Box my={2} display="flex" justifyContent="space-between">
            <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<Plus />}
            >
                Добавить фильтр
            </Button>
            <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<List />}
            >
                Настройка полей
            </Button>
        </Box>
    );
};

export default Filter;
