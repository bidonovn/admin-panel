import React from 'react';
import { Box, Drawer } from '@abdt/ornament';
import { FieldsSidebar } from '@components';

interface FieldsListProps {
    open: boolean;
    onClose: () => void;
}

export const FieldsList: React.FC<FieldsListProps> = ({ open, onClose }) => (
    <Drawer open={open} onClose={onClose} anchor="right">
        <Box width={550}>
            <FieldsSidebar onClose={onClose} />
        </Box>
    </Drawer>
);

export default FieldsList;
