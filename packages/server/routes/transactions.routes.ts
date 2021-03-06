import { Router } from 'express';
// const { Router } = require('express');
import { check, validationResult } from 'express-validator';
// const { check, validationResult } = require('express-validator');
import { Transaction } from '../models/Transaction';
// const Transaction = require('../models/Transaction');

const router = Router();

// /api/transactions/add - Добавление записи в таблицу
router.post(
    '/add',
    [check('user', 'Введите имя пользователя').exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректное имя пользователя',
                });
            }
            const { number, user, date, type, sum } = req.body;

            const isTransactionExist = await Transaction.findOne({ number });
            if (isTransactionExist) {
                return res.status(400).json({
                    message: 'Транзакция с таким номером уже существует',
                });
            }

            const transaction = new Transaction({
                number,
                user,
                date,
                type,
                sum,
            });
            await transaction.save();
            return res
                .status(201)
                .json({ message: 'Запись успешно сохранена' });
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

        const filtersQuery = {};

        const transformFilterQuery = () => {
            const filtersWithValue = filters?.filter(
                (filterItem) => filterItem.value || filterItem.date
            );

            filtersWithValue?.forEach((filter) => {
                switch (filter.filterType) {
                    case 'date':
                        filtersQuery[filter.name] = {
                            $gte: filter.date.startDate,
                            $lte: filter.date.endDate,
                        };
                        break;
                    case 'text':
                        filtersQuery[filter.name] = new RegExp(
                            filter.value,
                            'i'
                        );
                        break;
                    default:
                        filtersQuery[filter.name] = filter.value;
                }
            });
        };

        transformFilterQuery();
        const count = await Transaction.count(filtersQuery);
        const transactions = await Transaction.find(filtersQuery)
            .sort({ [orderBy]: order })
            .skip(limit * page - limit)
            .limit(limit);

        return res.json({
            items: transactions,
            count,
            countOnPage: transactions.length,
            current: page,
            pages: Math.ceil(count / limit),
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
        const transaction = await Transaction.findById(req.params.id);
        return res.json(transaction);
    } catch (e) {
        return res
            .status(500)
            .json({ message: `Произошла ошибка: ${e.message}` });
    }
});

module.exports = router;
