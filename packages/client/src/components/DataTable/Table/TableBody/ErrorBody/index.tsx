import * as React from 'react';

import { TableBody, TableCell, TableRow, Typography } from '@abdt/ornament';

const ErrorBody: React.FC = () => (
    <TableBody>
        <TableRow>
            <TableCell colSpan={8} align="center">
                <Typography variant="body1" component="span">
                    Ошибка при получении данных
                </Typography>
            </TableCell>
        </TableRow>
    </TableBody>
);

export default React.memo(ErrorBody);
