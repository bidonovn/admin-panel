import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Grid,
    FormControlLabel,
    Checkbox,
} from '@abdt/ornament';
import { indexOf, find, isEqual } from 'lodash';
import useStyles from './style';
import { AppContext } from 'context/AppContext.Provider';
import { Transaction } from 'models';
import { headCells as headCellsArray } from 'utils';

interface FieldsListProps {
    open: boolean;
    onClose: () => void;
}

export const FieldsList: React.FC<FieldsListProps> = ({ open, onClose }) => {
    const { userCells, setUserCells } = React.useContext(AppContext);
    const classes = useStyles();

    /** Сравнивает объект из localStorage с исходным массивом на наличие и обновление полей */
    const checkUpdate = () => {
        const newArr = userCells;
        headCellsArray.map((headCell) => {
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
        newArr.map((userField, index) => {
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

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Настройка отображения полей таблицы</DialogTitle>
            <DialogContent>
                <Box width={320}>
                    <Grid container spacing={2}>
                        {userCells.map((userCell) => (
                            <Grid item xs={12} key={userCell.name}>
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
                                    label={userCell.label}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default FieldsList;
