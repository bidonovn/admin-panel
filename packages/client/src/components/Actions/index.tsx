import React, { useState } from 'react';
import { Box, Button } from '@abdt/ornament';
import { Plus, List } from '@abdt/icons';
import { FieldsList, Filters } from '@components';
import { AppContext } from '@context/AppContext.Provider';

export const Actions: React.FC = () => {
    const { filters, setFilters, userCells } = React.useContext(AppContext);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const fieldsListDialogHandler = () => setOpenDialog(!openDialog);
    const addFilterHandler = () =>
        setFilters([...filters, userCells[filters.length]]);

    const disabled = Object.keys(filters).length === userCells.length;
    return (
        <>
            <Box my={2} display="flex" justifyContent="space-between">
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<Plus size="small" />}
                    onClick={addFilterHandler}
                    disabled={disabled}
                >
                    Добавить фильтр
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<List />}
                    onClick={fieldsListDialogHandler}
                >
                    Настройка полей
                </Button>
            </Box>
            <Filters />
            <FieldsList open={openDialog} onClose={fieldsListDialogHandler} />
        </>
    );
};

export default Actions;
