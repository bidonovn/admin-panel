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
    /** Номер транзакции */
    number: number;
    /** Пользователь */
    user_name: string;
    /** Дата транзакции */
    date: Date | null;
    /** Тип транзакции */
    type: keyof typeof TransactionTypeEnum | string;
    /** Сумма транзакции */
    sum: number;
}
