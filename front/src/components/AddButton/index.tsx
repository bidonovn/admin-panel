import React, { useState } from 'react';
import { Button } from '@abdt/ornament';
import Create from '../Create';

export const AddButton: React.FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <Button
                size="small"
                variant="text"
                onClick={() => setOpen(true)}
            >
                Добавить запись
            </Button>
            <Create open={isOpen} onClose={() => setOpen(false)} />
        </>
    );
};

export default AddButton;
