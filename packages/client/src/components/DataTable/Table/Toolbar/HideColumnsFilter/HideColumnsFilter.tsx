import React, { useState } from 'react';
import {
    Box,
    FormControlLabel,
    Switch,
    IconButton,
    Button,
    Grid,
} from '@abdt/ornament';
import { FilterFunnel, Close } from '@abdt/icons';
import { Popover } from '@material-ui/core';
import { TableColumnFromProps, TableState } from '../../types';

interface HideColumnsFilterProps {
    tableColumns: TableColumnFromProps[];
    setTableState: React.Dispatch<React.SetStateAction<TableState>>;
    hidedColumns: TableState['hidedColumns'];
}

export const HideColumnsFilter: React.FC<HideColumnsFilterProps> = ({
    tableColumns,
    hidedColumns,
    setTableState,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTableState(({ hidedColumns, ...otherState }) => {
            if (hidedColumns.includes(event.target.value)) {
                return {
                    ...otherState,
                    hidedColumns: hidedColumns.filter(
                        (value) => value !== event.target.value
                    ),
                };
            }
            return {
                ...otherState,
                hidedColumns: [...hidedColumns, event.target.value],
            };
        });
    };

    const showAll = () => {
        setTableState((prevState) => {
            return {
                ...prevState,
                hidedColumns: [],
            };
        });
    };

    const hideAll = () => {
        setTableState((prevState) => {
            return {
                ...prevState,
                hidedColumns: tableColumns.map(({ field }) => field),
            };
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    return (
        <>
            <Popover
                open={!!anchorEl}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                id={`${!!anchorEl}`}
            >
                <Box p={5}>
                    <Grid container direction="column" spacing={2}>
                        {tableColumns.map(({ headerName, field }) => {
                            const checked = !hidedColumns.includes(field);

                            return (
                                <Grid item container key={field}>
                                    <FormControlLabel
                                        label={headerName}
                                        value={field}
                                        checked={checked}
                                        control={
                                            <Switch
                                                onChange={handleChangeSwitch}
                                            />
                                        }
                                    />
                                </Grid>
                            );
                        })}
                        <Grid item>
                            <Button fullWidth size="small" onClick={showAll}>
                                Показать все
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button fullWidth size="small" onClick={hideAll}>
                                Скрыть все
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
            <IconButton onClick={handleButtonClick}>
                <FilterFunnel />
            </IconButton>
        </>
    );
};
