const { Schema, model } = require('mongoose');

const schema = Schema({
  number: { type: String, required: true, unique: true },
  user: { type: String, required: true },
  type: { type: String, enum: ['plus', 'minus'], required: true },
  date: { type: Date, required: true },
  sum: { type: Number },
});

module.exports = model('Transaction', schema);
