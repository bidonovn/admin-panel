import { Router } from 'express';
import { Pool } from 'pg';
import { config } from '../config';
import { check, validationResult } from 'express-validator';

const pool = new Pool(config.credentials);
const router = Router();

// /api/transactions/add - Добавление записи в таблицу
router.post(
    '/add',
    [check('user_name', 'Введите имя пользователя').exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректное имя пользователя',
                });
            }
            const { number, user_name, date, type, sum } = req.body;

            pool.query(
                'INSERT INTO transactions(type, user_name, sum, date, number) VALUES($1, $2, $3, $4, $5)',
                [type, user_name, sum, date, number]
            )
                .then((result) => {
                    return res.status(201).json({
                        message: `Запись успешно сохранена. Result: ${result}`,
                    });
                })
                .catch((error) => {
                    console.log('error', error);
                    return res.status(500).json({
                        message: `Произошла ошибка: ${error}`,
                    });
                });
        } catch (e) {
            return res
                .status(500)
                .json({ message: `Произошла ошибка: ${e.message}` });
        }
    }
);

// /api/transactions/list - Получение списка транзакций с фильтрами, сортировкой и пагинацией
router.post('/list', async (req, res) => {
    try {
        const limit = req.body.query.limit || 5;
        const page = req.body.query.page || 1;
        const order = req.body.query.order || 'asc';
        const orderBy = req.body.query.orderBy || 'date';
        const { filters } = req.body.query;

        const filtersArr = [];

        const transformFilters = () => {
            const filtersWithValue = filters?.filter(
                (filterItem) => filterItem.value || filterItem.date
            );

            filtersWithValue?.forEach((filter) => {
                switch (filter.filterType) {
                    case 'date':
                        filtersArr.push(
                            `${filter.name} BETWEEN '${filter.date.startDate}' AND '${filter.date.endDate}'`
                        );
                        break;
                    case 'text':
                        filtersArr.push(
                            `${filter.name} LIKE '%${filter.value}%'`
                        );
                        break;
                    default:
                        filtersArr.push(`${filter.name} = '${filter.value}'`);
                }
            });
        };
        transformFilters();

        const filtersQuery = filtersArr.length
            ? `WHERE ${filtersArr.join(' AND ')}`
            : '';

        /** Запрос на получение количества всех записей */
        const totalCount = await pool
            .query(`SELECT count(*) from transactions ${filtersQuery}`)
            .then((res) => res.rows[0].count);

        /** Запрос с фильтрацией и сортировкой */
        pool.query(
            `SELECT * FROM transactions ${filtersQuery} ORDER BY ${orderBy} ${order} LIMIT ${limit} OFFSET ${
                limit * page - limit
            }`
        )
            .then((result) => {
                return res.status(200).json({
                    items: result.rows,
                    count: totalCount,
                    countOnPage: result.rowCount,
                    current: page,
                    pages: Math.ceil(totalCount / limit),
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    message: `Произошла ошибка: ${error}`,
                });
            });
    } catch (e) {
        return res
            .status(500)
            .json({ message: `Произошла ошибка: ${e.message}` });
    }
});

// /api/transactions/:id - Получение подробной информации о транзакции по id
router.get('/:id', async (req, res) => {
    try {
        pool.query(`SELECT * FROM transactions WHERE id = ${req.params.id}`)
            .then((result) => {
                return res.json(result.rows[0]);
            })
            .catch((error) => {
                return res
                    .status(404)
                    .json({ message: 'Запись не найдена', error });
            });
    } catch (e) {
        return res
            .status(500)
            .json({ message: `Произошла ошибка: ${e.message}` });
    }
});

module.exports = router;
