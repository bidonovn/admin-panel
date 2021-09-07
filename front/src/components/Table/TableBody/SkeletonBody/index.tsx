import * as React from 'react';
import { Skeleton, TableBody, TableCell, TableRow } from '@abdt/ornament';

const TableSkeletonBody: React.FC = () => {
    return (
        <TableBody>
            {[1, 2, 3].map((item) => (
                <TableRow key={item}>
                    <TableCell>
                        <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={60} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={60} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={90} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={80} />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default React.memo(TableSkeletonBody);
