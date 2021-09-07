import { useState } from 'react';
import { axios } from '../axios/config';
import { TransactionsResponse } from '../models';

export interface TransactionsListQueryReturn {
    data: TransactionsResponse;
    loading: boolean;
    error?: string;
    get: (query: any) => void;
}

interface State {
    data: TransactionsResponse;
    loading: boolean;
    error?: string;
}

/**
 * Получение списка транзакций
 */
export const useTransactionsList = (): TransactionsListQueryReturn => {
    const [state, setState] = useState<State>({
        loading: false,
        error: undefined,
        data: { items: [], count: 0, current: 0, pages: 0 },
    });

    const get = (query: any) => {
        setState({ ...state, loading: true });
        axios
            .post(`/api/transactions/list`, { query })
            .then((res) => {
                setState({ ...state, data: res.data });
            })
            .catch((err: Error) => {
                setState({ ...state, error: err.message });
            })
            .finally(() => {
                setState((prevState) => ({ ...prevState, loading: false }));
            });
    };

    return { ...state, get };
};
