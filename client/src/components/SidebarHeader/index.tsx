import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Box, Typography, IconButton, TextField, Paper } from '@abdt/ornament';
import { Close, Search } from '@abdt/icons';
import { debounce } from 'lodash';
import { useStylesSearchInput } from './style';

interface SidebarHeaderProps {
    setFilteredData?: (searchString: string) => void;
    onClose: () => void;
}

const debouncedSetFilteredData = debounce((searchString, setFilteredData) => {
    setFilteredData(searchString);
}, 300);

const SidebarHeaderComponent: React.FC<SidebarHeaderProps> = ({
    onClose,
    setFilteredData,
}) => {
    const [searchString, setSearchString] = useState<string>('');
    const [isShowSearchInput, setShowSearchInput] =
        React.useState<boolean>(false);
    const classes = useStylesSearchInput();
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const drawerHandler = () => {
        onClose();
    };

    const showSearchInputHandler = () => {
        setShowSearchInput(!isShowSearchInput);
    };

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.target.value);
        },
        []
    );

    useEffect(() => {
        if (searchString) {
            debouncedSetFilteredData(searchString, setFilteredData);
        } else if (setFilteredData) {
            debouncedSetFilteredData?.cancel();
            setFilteredData(searchString);
        }
    }, [searchString, setFilteredData]);

    useEffect(() => {
        if (isShowSearchInput) {
            searchInputRef?.current?.focus();
        } else {
            searchInputRef?.current?.blur();
        }
    }, [isShowSearchInput]);

    return (
        <Paper square>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={3}
            >
                {isShowSearchInput ? (
                    <TextField
                        classes={{ ...classes }}
                        size="small"
                        variant="standard"
                        placeholder="Поиск..."
                        onChange={handleSearchChange}
                        value={searchString}
                        inputProps={{ ref: searchInputRef }}
                    />
                ) : (
                    <Typography variant="body1" bold>
                        Настройка отображения полей
                    </Typography>
                )}
                <Box>
                    <IconButton onClick={showSearchInputHandler}>
                        <Search color="#E6E7EA" />
                    </IconButton>
                    <IconButton onClick={drawerHandler}>
                        <Close color="#E6E7EA" />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export const SidebarHeader = React.memo(SidebarHeaderComponent);
