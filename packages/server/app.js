const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = config.get('port') || 5000;
const app = express();

app.use(express.json({ extended: true }));
app.use(cors());
app.use('/api/transactions', require('./routes/transactions.routes'));

async function start() {
  try {
    await mongoose.connect(config.get('dataBaseUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`App has been started at port ${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
