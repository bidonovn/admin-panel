export enum TransactionTypeEnum {
    Plus = 'plus',
    Minus = 'minus',
}

interface typesInterface {
    [key: string]: string;
}

export const transactionsTypesLabels: typesInterface = {
    [TransactionTypeEnum.Plus]: 'Пополнение',
    [TransactionTypeEnum.Minus]: 'Снятие',
};

export interface Transaction {
    /** id транзакции */
    _id: string;
    /** Номер транзакции */
    number: number;
    /** Пользователь */
    user: string;
    /** Дата транзакции */
    date: Date | null;
    /** Тип транзакции */
    type: keyof typeof TransactionTypeEnum | string;
    /** Сумма транзакции */
    sum: number;
}
