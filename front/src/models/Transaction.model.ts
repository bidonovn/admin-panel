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
    number: number;
    user: string;
    date: Date | null;
    type: keyof typeof TransactionTypeEnum | string;
    sum: number;
}
