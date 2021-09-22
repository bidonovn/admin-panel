import { HeadCell } from 'models';
import { escapeRegExp } from 'lodash';

const CHAR_COUNT_FOR_START_FILTERING = 2;

/** Фильтрация исполнителей по поисковой строке */
export const filterCells = (
    userCells: HeadCell[],
    searchString: string
): HeadCell[] => {
    if (!searchString || searchString.length < CHAR_COUNT_FOR_START_FILTERING) {
        return userCells;
    }

    const filteredCells: HeadCell[] = [];

    userCells.reduce((acc: HeadCell[], cell: HeadCell) => {
        const regexp = new RegExp(escapeRegExp(searchString), 'gi');

        if (cell.label.match(regexp)) {
            acc.push(cell);
        }

        return acc;
    }, filteredCells);

    return filteredCells;
};
