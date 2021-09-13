import React from 'react';
import { Typography } from '@abdt/ornament';
import { formatDateWithoutTime } from '@utils';
import { transactionsTypesLabels } from '@models';

const Empty = () => (
    <Typography component="div" variant="body2">
        —
    </Typography>
);

/** Форматирует данные в зависимости от имени поля */
export const tableHelper = (name: string, value: any) => {
    switch (name) {
        case 'sum':
            return value || 0;
        case 'date':
            return formatDateWithoutTime(value);
        case 'user':
            return value || <Empty />;
        case 'type':
            return transactionsTypesLabels[value];
        default:
            return value;
    }
};
