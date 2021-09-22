import React, { useEffect } from 'react';
import { Box, FormControlLabel, Checkbox } from '@abdt/ornament';
import { indexOf, find, isEqual } from 'lodash';
import useStyles from './style';
import { AppContext } from 'context/AppContext.Provider';
import { HeadCell, Transaction } from 'models';
import { headCells as headCellsArray } from 'utils';
import { SidebarHeader, Highlighter } from 'components';
import { filterCells } from './utils';

interface FieldsSidebarProps {
    onClose: () => void;
}

export const FieldsSidebar: React.FC<FieldsSidebarProps> = ({ onClose }) => {
    const { userCells, setUserCells } = React.useContext(AppContext);
    const [filteredData, setFilteredData] = React.useState<HeadCell[]>([]);
    const [searchStr, setSearchStr] = React.useState<string>('');
    const classes = useStyles();

    /** Сравнивает объект из localStorage с исходным массивом на наличие и обновление полей */
    const checkUpdate = () => {
        const newArr = userCells;
        headCellsArray.forEach((headCell) => {
            const obj = find(newArr, { name: headCell.name });
            if (!obj) {
                newArr.push(headCell);
            } else {
                const index = indexOf(newArr, obj);
                if (!isEqual(newArr[index], headCell)) {
                    newArr[index] = {
                        ...newArr[index],
                        name: headCell.name,
                        filterType: headCell.filterType,
                        label: headCell.label,
                    };
                }
            }
        });
        newArr.forEach((userField, index) => {
            const obj = find(headCellsArray, { name: userField.name });
            if (!obj) {
                newArr.splice(index, 1);
            }
        });
        setUserCells(newArr);
        localStorage.setItem('userFields', JSON.stringify(newArr));
    };

    useEffect(() => checkUpdate(), []);

    const checkboxHandler = (cell: keyof Transaction) => {
        const tmp = userCells;
        let obj = find(tmp, { name: cell });
        const index = indexOf(tmp, obj);
        if (obj) {
            obj = { ...obj, isActive: !obj?.isActive };
            tmp[index] = obj;
        }
        setUserCells([...tmp]);
        localStorage.setItem('userFields', JSON.stringify(tmp));
    };

    const handleSetFilteredData = React.useCallback(
        (searchString: string) => {
            setSearchStr(searchString);
            setFilteredData(filterCells(userCells, searchString));
        },
        [userCells]
    );

    return (
        <>
            <SidebarHeader
                onClose={onClose}
                setFilteredData={handleSetFilteredData}
            />
            <Box p={3}>
                {filteredData.map((userCell) => (
                    <Box key={userCell.name}>
                        <FormControlLabel
                            classes={{ ...classes }}
                            control={
                                <Checkbox
                                    checked={userCell.isActive}
                                    onChange={() =>
                                        checkboxHandler(userCell.name)
                                    }
                                    size="small"
                                />
                            }
                            label={
                                <Highlighter
                                    text={userCell.label}
                                    searchString={searchStr}
                                />
                            }
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default FieldsSidebar;
