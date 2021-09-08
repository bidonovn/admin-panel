import React, { useState } from 'react';
import { Box, Button } from '@abdt/ornament';
import { Plus, List } from '@abdt/icons';
import FieldsList from 'components/FieldsList';

export const Actions: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const fieldsListDialogHandler = () => setOpenDialog(!openDialog);

    return (
        <>
            <Box my={2} display="flex" justifyContent="space-between">
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    startIcon={<Plus size="small" />}
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
            <FieldsList open={openDialog} onClose={fieldsListDialogHandler} />
        </>
    );
};

export default Actions;
