import { useEffect, useState } from 'react';
import { axios } from '../axios/config';
import { Transaction } from '../models';

export interface TransactionQueryReturn {
    transaction?: Transaction;
    loading: boolean;
    error?: string;
}

/**
 * Получение транзакции по id
 */
export const useTransactionQuery = (id: string): TransactionQueryReturn => {
    const [state, setState] = useState<TransactionQueryReturn>({
        loading: false,
        error: undefined,
        transaction: undefined,
    });

    useEffect(() => {
        setState({ ...state, loading: true });
        axios
            .get(`/api/transactions/${id}`)
            .then((res) => {
                setState({ ...state, transaction: res.data });
            })
            .catch((err: Error) => {
                setState({ ...state, error: err.message });
            })
            .finally(() => {
                setState((prevState) => ({ ...prevState, loading: false }));
            });
    }, [id]);

    return { ...state };
};
