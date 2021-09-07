import { Order, Transaction } from './index';

export interface TransactionsQuery {
    limit?: number;
    page?: number;
    order?: Order;
    orderBy?: keyof Transaction;
}
