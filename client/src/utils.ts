import { DateTime } from 'luxon';
import { HeadCell } from 'models';

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

export const headCells: HeadCell[] = [
    { name: 'number', label: 'Номер записи' },
    { name: 'user', label: 'Клиент' },
    { name: 'type', label: 'Тип транзакции' },
    { name: 'date', label: 'Дата' },
    { name: 'sum', label: 'Сумма' },
];

const b = 2;
