import express from 'express';
import { config } from '../config';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = config.port || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/transactions', require('../routes/transactions.routes'));

async function start() {
    try {
        await mongoose.connect(config.dataBaseUrl, {});
        app.listen(PORT, () =>
            console.log(`App has been started at port ${PORT}`)
        );
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log('Server Error', e.message);
        }
        process.exit(1);
    }
}

start();
// console.log(111);
