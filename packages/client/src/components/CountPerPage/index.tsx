import React, { useState } from 'react';
import { Select, MenuItem, FormControl, Typography, Box } from '@abdt/ornament';
import useStyles from './style';
import { AppContext } from '@context/AppContext.Provider';

const options = [5, 10, 15];

export const CountPerPage: React.FC = () => {
    const { query, setQuery } = React.useContext(AppContext);
    const [countPerPage, setCountPerPage] = useState<number>(5);

    const classes = useStyles();

    /** Выбор количества отображаемых записей на странице */
    const countPerPageHandler = ({
        target: { value },
    }: React.ChangeEvent<any>): void => {
        setQuery({ ...query, limit: value });
        setCountPerPage(value);
    };

    return (
        <Box display="flex" flexWrap="no-wrap">
            <Box mr={2} my="auto">
                <Typography variant="caption">Записей на странице: </Typography>
            </Box>
            <FormControl size="small">
                <Select
                    onChange={countPerPageHandler}
                    value={countPerPage}
                    classes={classes}
                >
                    {options.map((option, index) => (
                        <MenuItem value={option} key={index}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CountPerPage;
