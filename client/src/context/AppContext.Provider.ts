import React from 'react';
import { HeadCell, TransactionsQuery, Filter } from 'models';
import { headCells } from 'utils';

export type AppContextType = {
    userCells: HeadCell[];
    setUserCells: (userCells: HeadCell[]) => void;
    filters: Filter[];
    setFilters: (filters: Filter[]) => void;
    query: TransactionsQuery;
    setQuery: (query: TransactionsQuery) => void;
};

export const AppContext = React.createContext<AppContextType>({
    userCells: headCells,
    setUserCells: () => undefined,
    filters: [],
    setFilters: () => undefined,
    query: {},
    setQuery: () => undefined,
});

export const AppContextProvider = AppContext.Provider;
