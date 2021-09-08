import React from 'react';
import { HeadCell, TransactionsQuery } from 'models';
import { headCells } from 'utils';

export type AppContextType = {
    headCells: HeadCell[];
    setHeadCells: (headCells: HeadCell[]) => void;
    filters: { [key: string]: any };
    setFilters: (filters: { [key: string]: any }) => void;
    query: TransactionsQuery;
    setQuery: (query: TransactionsQuery) => void;
};

export const AppContext = React.createContext<AppContextType>({
    headCells: JSON.parse(localStorage.userFields) || headCells,
    setHeadCells: () => undefined,
    filters: {},
    setFilters: () => undefined,
    query: {},
    setQuery: () => undefined,
});

export const AppContextProvider = AppContext.Provider;
