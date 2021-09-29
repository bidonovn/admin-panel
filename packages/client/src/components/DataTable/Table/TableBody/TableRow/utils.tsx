import React from 'react';
import { Typography } from '@abdt/ornament';
import { formatDateWithoutTime } from '@utils';
import { ColumnValueType, TableCell } from '../../types';

const Empty = () => (
    <Typography component="div" variant="body2">
        —
    </Typography>
);

/** Форматирует данные в зависимости от типа поля */
export const formattingCellValueByType = (
    type: keyof typeof ColumnValueType,
    value: TableCell['value']
): string | number | JSX.Element | undefined => {
    switch (type) {
        case ColumnValueType.date:
            return formatDateWithoutTime(value as string);
        case ColumnValueType.number:
        case ColumnValueType.string:
        default:
            return value || <Empty />;
    }
};
