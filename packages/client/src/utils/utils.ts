import { DateTime } from 'luxon';
import { HeadCell } from '@models';

export const transactionTypes = [
    { name: 'plus', label: 'Пополнение' },
    { name: 'minus', label: 'Снятие' },
];

export const formatDateWithoutTime = (
    date: Date | null | string
): string | undefined => {
    if (!date) return undefined;

    return DateTime.fromISO(date.toString()).toLocal().toFormat('dd.LL.y');
};

export const randomNumber = (): number =>
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

export const formatDate = (
    date: Date | null | undefined
): string | undefined => {
    if (!date) return undefined;

    return DateTime.fromISO(date.toString())
        .toLocal()
        .toFormat('dd.LL.y HH:mm');
};

export const transformDate = (date: Date, dayPart: 'start' | 'end'): string => {
    if (dayPart === 'start') {
        return DateTime.fromJSDate(date).startOf('day').toLocal()?.toFormat('yyyy-LL-dd,HH:mm:ss').toString();
    }
    return DateTime.fromJSDate(date).endOf('day').toLocal()?.toFormat('yyyy-LL-dd,HH:mm:ss').toString();
};

export const defaultDates = {
    start: DateTime.local().minus({ weeks: 2 }).startOf('day'),
    end: DateTime.local().endOf('day'),
};

/** Массив с информацией о существующих полях */
export const headCells: HeadCell[] = [
    {
        name: 'number',
        label: 'Номер записи',
        isActive: true,
        filterType: 'number',
    },
    { name: 'user_name', label: 'Клиент', isActive: true, filterType: 'text' },
    {
        name: 'type',
        label: 'Тип транзакции',
        isActive: true,
        filterType: 'enum',
        options: [
            { value: 'plus', label: 'Пополнение' },
            { value: 'minus', label: 'Снятие' },
        ],
    },
    { name: 'date', label: 'Дата', isActive: true, filterType: 'date' },
    { name: 'sum', label: 'Сумма', isActive: true, filterType: 'number' },
];
