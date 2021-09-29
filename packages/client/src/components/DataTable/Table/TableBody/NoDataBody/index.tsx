import React from 'react';
import { TableBody, TableCell, TableRow, Typography } from '@abdt/ornament';

const NoDataBody: React.FC = () => {
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={8} align="center">
                    <Typography variant="body1" component="span">
                        Записей не найдено
                    </Typography>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default React.memo(NoDataBody);
