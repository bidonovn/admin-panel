import { makeStyles } from '@material-ui/core/styles';

export const useStylesSearchInput = makeStyles(() => ({
    root: {
        width: '80%',
        '& input': {
            fontSize: 16,
            fontWeight: 500,
            paddingTop: 6,
        },
    },
}));
