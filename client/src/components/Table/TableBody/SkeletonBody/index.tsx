import * as React from 'react';
import { Skeleton, TableBody, TableCell, TableRow } from '@abdt/ornament';
import { AppContext } from 'context/AppContext.Provider';

const TableSkeletonBody: React.FC = () => {
    const { userCells } = React.useContext(AppContext);

    const activeHeadCells = React.useMemo(
        () => userCells.filter((userCell) => userCell.isActive),
        [userCells]
    );

    return (
        <TableBody>
            {[1, 2, 3].map((item) => (
                <TableRow key={item}>
                    {activeHeadCells.map((cell) => (
                        <TableCell key={cell.name}>
                            <Skeleton variant="text" width={80} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default React.memo(TableSkeletonBody);
