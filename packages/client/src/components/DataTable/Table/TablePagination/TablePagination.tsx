import React, { useCallback } from 'react';
import {
    Box,
    Typography,
    Pagination,
    FormControl,
    Select,
    SelectProps,
    MenuItem,
} from '@abdt/ornament';
import { TableState } from '../types';
import useStyles from './style';

interface TablePaginationComponentProps {
    totalItemsCount: number;
    itemsCount: number;
    pagesCount: number;
    currentPage: number;
    rowsPerPageOptions: number[];
    rowsPerPage: number;
    setTableState: React.Dispatch<React.SetStateAction<TableState>>;
}

const TablePaginationComponent: React.FC<TablePaginationComponentProps> = ({
    totalItemsCount,
    itemsCount,
    pagesCount,
    currentPage = 1,
    rowsPerPageOptions,
    rowsPerPage,
    setTableState,
}) => {
    const classes = useStyles();

    const handleChangePage = useCallback((_, currentPage: number) => {
        setTableState((prevState) => {
            return {
                ...prevState,
                currentPage,
            };
        });
    }, []);

    const handleChangeItemsPerPage: SelectProps['onChange'] = useCallback(
        (e) => {
            setTableState((prevState) => {
                return {
                    ...prevState,
                    rowsPerPage: e.target.value || rowsPerPageOptions[0],
                };
            });
        },
        []
    );

    return (
        <Box
            my={3}
            px={3}
            display="flex"
            justifyContent="space-between"
            width="100%"
        >
            <Typography align="right" component="div" variant="caption">
                Записей на странице {itemsCount}
                {' из '}
                {totalItemsCount}
            </Typography>
            <Box display="flex" flexWrap="no-wrap">
                <Box mr={3} my="auto">
                    <Typography variant="caption">
                        Записей на странице:{' '}
                    </Typography>
                </Box>
                <FormControl size="small">
                    <Select
                        classes={classes}
                        onChange={handleChangeItemsPerPage}
                        value={rowsPerPage}
                    >
                        {rowsPerPageOptions.map((option, index) => (
                            <MenuItem value={option} key={index}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Pagination
                    onChange={handleChangePage}
                    page={currentPage}
                    count={pagesCount}
                />
            </Box>
        </Box>
    );
};

export const TablePagination = React.memo(TablePaginationComponent);
