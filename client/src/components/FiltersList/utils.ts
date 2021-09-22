import { Transaction, transactionsTypesLabels } from 'models';
import { formatDateWithoutTime } from 'utils';

export const labelFormatter = (
    name: keyof Transaction,
    value: any
): string | number | undefined => {
    switch (name) {
        case 'date':
            return `С ${formatDateWithoutTime(
                value.startDate
            )} по ${formatDateWithoutTime(value.endDate)}`;
        case 'type':
            return `${transactionsTypesLabels[value]}`;
        default:
            return value;
    }
};
