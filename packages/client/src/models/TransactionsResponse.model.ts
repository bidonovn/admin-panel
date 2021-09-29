import { Transaction } from './Transaction.model';

export interface TransactionsResponse {
    /** Транзакции */
    items: Transaction[];
    /** Количество записей */
    count: number;
    /** Текущяя страница */
    current: number;
    /** Количество страниц */
    pages: number;
    /** Количество элементов на странице */
    countOnPage?: number;
}
