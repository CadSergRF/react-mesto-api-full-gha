require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
const helmet = require('helmet');
const cors = require('cors');

const allRoutes = require('./routes/index');

const errors = require('./middlewares/errors');
const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const corsError = require('./middlewares/corsError');

const app = express();

const { PORT, DATABASE } = process.env;
const { DEFAULT_PORT, DEFAULT_DATABASE } = require('./utils/config');

mongoose.connect(DATABASE || DEFAULT_DATABASE);

// .use(corsError)

app.use(cors({
  origin: "*",
  credentials: true
}))
  .use(bodyParser.json())
  .use(helmet())
  .use(rateLimiter)
  .use(cookieParser())
  .use(requestLogger)
  .use('/', allRoutes)
  .use(errorLogger)
  .use(celebrateErrors())
  .use(errors);

app.listen(PORT || DEFAULT_PORT);
