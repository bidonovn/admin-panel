import { Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles<Theme>({
    root: {
        backgroundColor: '#DEF8E0',
        borderRadius: 8,
    },
    ellipsis: {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitBoxOrient: 'vertical',
    },
    isUpdate: {
        opacity: '0.5',
    },
    tableBody: {
        '& td': {
            maxWidth: 200,
        },
        '&:hover': {
            background: 'rgba(0, 10, 38, 0.025)',
            cursor: 'pointer',
        },
    },
    icon: {
        display: 'flex',
        margin: 'auto 0',
    },
});
