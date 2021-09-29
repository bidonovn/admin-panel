import { Order, Transaction, Filter } from './index';

export interface TransactionsQuery {
    /** Количество отображаемых записей */
    limit?: number;
    /** Страница */
    page?: number;
    /** Сортировка (по возрастанию/по убыванию) */
    order?: Order;
    /** Поле, по которому происходит сортировка */
    orderBy?: keyof Transaction;
    /** Фильтры */
    filters?: Filter[];
}
