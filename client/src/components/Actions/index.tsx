import React, { useState } from 'react';
import { Box, Tooltip, IconButton } from '@abdt/ornament';
import { FilterFunnel, Edit } from '@abdt/icons';
import { FieldsList, Filters } from 'components';

export const Actions: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFilters, setOpenFilters] = useState<boolean>(false);

    const fieldsListDialogHandler = () => setOpenDialog(!openDialog);
    const filtersHandler = () => setOpenFilters(!openFilters);

    return (
        <>
            <Box my={2} display="flex" justifyContent="space-between">
                <Tooltip
                    title={openFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
                    placement="right-end"
                >
                    <IconButton color="secondary" onClick={filtersHandler}>
                        <FilterFunnel />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Настройка полей" placement="left-start">
                    <IconButton
                        color="secondary"
                        onClick={fieldsListDialogHandler}
                    >
                        <Edit />
                    </IconButton>
                </Tooltip>
            </Box>
            <Filters open={openFilters} setOpen={setOpenFilters} />
            <FieldsList open={openDialog} onClose={fieldsListDialogHandler} />
        </>
    );
};

export default Actions;
