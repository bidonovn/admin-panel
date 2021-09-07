import React from 'react';
import { Select, MenuItem, FormControl, Typography, Box } from '@abdt/ornament';
import useStyles from './style';

interface CountPerPageProps {
    onChange: (target: React.ChangeEvent<any>) => void;
    value: number;
}
const options = [5, 10, 15];

export const CountPerPage: React.FC<CountPerPageProps> = ({
    onChange,
    value,
}) => {
    const classes = useStyles();
    return (
        <Box display="flex" flexWrap="no-wrap">
            <Box mr={2} my="auto">
                <Typography variant="caption">Записей на странице: </Typography>
            </Box>
            <FormControl size="small">
                <Select onChange={onChange} value={value} classes={classes}>
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
