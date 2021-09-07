import React from 'react';
import { Pagination } from '@abdt/ornament';

interface PaginationProps {
    onChange: any;
    pageNumber: number;
    count: number;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
    onChange,
    pageNumber,
    count,
}) => {
    return <Pagination onChange={onChange} page={pageNumber} count={count} />;
};

export default PaginationComponent;
