import { Transaction, transactionsTypesLabels } from '@models';
import { DateTime } from 'luxon';

export const formatDate = (date: Date | null | string): string | undefined => {
    if (!date) return undefined;
    console.log(date);
    return DateTime.fromFormat(date.toString(), 'yyyy-LL-dd,HH:mm:ss').toFormat(
        'dd.LL.y'
    );
};

export const labelFormatter = (
    name: keyof Transaction,
    value: any
): string | number | undefined => {
    switch (name) {
        case 'date':
            return `С ${formatDate(value.startDate)} по ${formatDate(
                value.endDate
            )}`;
        case 'type':
            return `${transactionsTypesLabels[value]}`;
        default:
            return value;
    }
};
