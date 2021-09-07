import { useState } from 'react';
import { axios } from '../axios/config';
import { Transaction } from '../models/Transaction.model';

interface AddTransactionQueryValue {
    loading: boolean;
    error: boolean;
    addTransaction: (data: Transaction, successCallback?: () => void) => void;
}

interface RequestState {
    loading: boolean;
    error: boolean;
}

/** Добавление записи в БД */
export const useAddTransaction = (): AddTransactionQueryValue => {
    const [requestState, setRequestState] = useState<RequestState>({
        loading: false,
        error: false,
    });

    const register = (
        data: Transaction,
        successCallback?: () => void
    ): void => {
        setRequestState({ loading: true, error: false });

        axios
            .post(`/api/transactions/add`, data)
            .then(() => {
                if (successCallback) {
                    successCallback();
                }
            })
            .catch(() => {
                setRequestState({ ...requestState, error: true });
            })
            .finally(() => {
                setRequestState({ ...requestState, loading: false });
            });
    };

    return { ...requestState, addTransaction: register };
};

export default useAddTransaction;
