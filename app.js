const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const {performCalculation,getHistory} = require('./controllers/calculatorController');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('Welcome to the calculator app');
});

app.get('/history', getHistory);

app.get('/:operands/:operation/:rest*?', performCalculation);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
