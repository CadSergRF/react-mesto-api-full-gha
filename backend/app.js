require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const helmet = require('helmet');

const allRoutes = require('./routes/index');

const errors = require('./middlewares/errors');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsErr = require('./middlewares/cors');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json())
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(corsErr)
  .use(requestLogger)
  .use('/', allRoutes)
  .use(errorLogger)
  .use(celebrateErrors())
  .use(errors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
