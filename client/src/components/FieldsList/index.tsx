import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Grid,
    FormControlLabel,
    Checkbox,
} from '@abdt/ornament';
import { indexOf, find } from 'lodash';
import useStyles from './style';
import { AppContext } from 'context/AppContext.Provider';
import { Transaction } from 'models';

interface FieldsListProps {
    open: boolean;
    onClose: () => void;
}

export const FieldsList: React.FC<FieldsListProps> = ({ open, onClose }) => {
    const { headCells, setHeadCells } = React.useContext(AppContext);
    const classes = useStyles();

    const checkboxHandler = (cell: keyof Transaction) => {
        const tmp = headCells;
        let obj = find(tmp, { name: cell });
        const index = indexOf(tmp, obj);
        if (obj) {
            obj = { ...obj, isActive: !obj?.isActive };
            tmp[index] = obj;
        }
        setHeadCells([...tmp]);
        localStorage.setItem('userFields', JSON.stringify(tmp));
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Настройка отображения полей таблицы</DialogTitle>
            <DialogContent>
                <Box width={320}>
                    <Grid container spacing={2}>
                        {headCells.map((headCell) => (
                            <Grid item xs={12}>
                                <FormControlLabel
                                    classes={{ ...classes }}
                                    control={
                                        <Checkbox
                                            checked={headCell.isActive}
                                            onChange={() =>
                                                checkboxHandler(headCell.name)
                                            }
                                            size="small"
                                        />
                                    }
                                    label={headCell.label}
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
