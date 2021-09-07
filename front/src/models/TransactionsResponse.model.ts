import { Transaction } from './Transaction.model';

export interface TransactionsResponse {
    items: Transaction[];
    count: number;
    current: number;
    pages: number;
}
