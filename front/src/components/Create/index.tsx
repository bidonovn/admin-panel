import React, { useState, useCallback } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@abdt/ornament';
import { DateTime } from 'luxon';
import { Transaction } from 'models';
import { transactionTypes, randomNumber } from 'utils';
import { useAddTransaction, useTransactionsList } from 'hooks';

interface CreateProps {
    open: boolean;
    onClose: () => void;
}

export const Create: React.FC<CreateProps> = ({ open, onClose }) => {
    const { addTransaction, loading } = useAddTransaction();
    const { get } = useTransactionsList();
    const [record, setRecord] = useState<Transaction>({
        number: randomNumber(),
        user: '',
        date: DateTime.local().toJSDate(),
        type: '',
        sum: 0,
    });

    /** Обработчик событий ввода в инпут */
    const textFieldHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRecord({ ...record, [event.target.name]: event.target.value });
        },
        [setRecord, record]
    );

    const selectOnChange = ({
        target: { value, name },
    }: React.ChangeEvent<any>): void => {
        setRecord({ ...record, [name]: value });
    };

    const successCallback = () => {
        onClose();
    };

    const saveHandler = () => {
        setRecord({
            ...record,
            number: randomNumber(),
            date: DateTime.local().toJSDate(),
        });
        addTransaction(record, successCallback);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Создать запись</DialogTitle>
            <DialogContent>
                <Box width={320}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Имя пользователя"
                                name="user"
                                value={record.user}
                                onChange={textFieldHandler}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Сумма"
                                name="sum"
                                value={record.sum}
                                onChange={textFieldHandler}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>Тип операции</InputLabel>
                                <Select
                                    defaultValue={transactionTypes[0]}
                                    onChange={selectOnChange}
                                    name="type"
                                    value={record.type || transactionTypes[0]}
                                >
                                    {transactionTypes?.map((type) => (
                                        <MenuItem
                                            key={type.name}
                                            value={type.name}
                                        >
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button size="small" disabled={loading} onClick={saveHandler}>
                    Создать
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Create;
