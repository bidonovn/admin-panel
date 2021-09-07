import React from 'react';
import { HeadCell } from 'models';
import { headCells } from 'utils';

export type HeadCellContextType = {
    headCells: HeadCell[];
    setHeadCells: (headCells: HeadCell[]) => void;
};

export const HeadCellContext = React.createContext<HeadCellContextType>({
    headCells: JSON.parse(localStorage.userFields) || headCells,
    setHeadCells: () => undefined,
});

export const HeadCellContextProvider = HeadCellContext.Provider;
