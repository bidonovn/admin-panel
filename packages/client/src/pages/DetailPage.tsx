import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Box, Paper, Link } from '@abdt/ornament';
import { useTransactionQuery } from '@hooks';
import { formatDate } from '@utils';

interface ParamProps {
    id: string;
}

export const DetailPage: React.FC = () => {
    const transactionId = useParams<ParamProps>().id;
    const { transaction, loading, error } = useTransactionQuery(transactionId);
    const history = useHistory();

    if (loading) {
        return (
            <Typography variant="h2">
                Загрузка данных о транзакции. Пожалуйста, подождите...
            </Typography>
        );
    }

    if (error) {
        return (
            <Typography variant="h2" color="error">
                При загрузке данных произошла ошибка: {error}
            </Typography>
        );
    }

    return (
        <>
            <Link onClick={() => history.push('/')}>На главную</Link>
            <Typography variant="h2" component="h1" gutterBottom>
                Транзакция № {transaction?.number}
            </Typography>
            <Box my={4}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Typography variant="body2">
                            id: {transactionId}
                        </Typography>
                        <Typography variant="body2">
                            Номер: {transaction?.number}
                        </Typography>
                        <Typography variant="body2">
                            Дата и время транзакции:{' '}
                            {formatDate(transaction?.date)}
                        </Typography>
                        <Typography variant="body2">
                            Клиент: {transaction?.user}
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default DetailPage;
