import { Schema, model } from 'mongoose';

const schema = new Schema({
    number: { type: String, required: true, unique: true },
    user: { type: String, required: true },
    type: { type: String, enum: ['plus', 'minus'], required: true },
    date: { type: Date, required: true },
    sum: { type: Number },
});

export const Transaction = model('Transaction', schema);
