import React, { useCallback } from 'react';
import { Pagination } from '@abdt/ornament';
import { AppContext } from 'context/AppContext.Provider';

interface PaginationProps {
    pageNumber: number;
    count: number;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
    pageNumber,
    count,
}) => {
    const { setQuery, query } = React.useContext(AppContext);

    /** Пагинация */
    const handlePageChange = useCallback(
        (_: any, page: number) => {
            setQuery({ ...query, page });
        },
        [query]
    );

    return (
        <Pagination
            onChange={handlePageChange}
            page={pageNumber}
            count={count}
        />
    );
};

export default PaginationComponent;
