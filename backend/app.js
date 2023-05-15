require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const helmet = require('helmet');
const corsConnect = require('./middlewares/corsSettings');

const allRoutes = require('./routes/index');

const errors = require('./middlewares/errors');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const PORT = process.env.PORT || 3001;
const DATABASE = process.env.DATABASE || 'mongodb://127.0.0.1:27017/mestodb';

mongoose.connect(DATABASE);

app.use(express.json())
  .use(corsConnect)
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(requestLogger)
  .use('/', allRoutes)
  .use(errorLogger)
  .use(celebrateErrors())
  .use(errors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
