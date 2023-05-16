const allRoutes = require('express').Router();
const auth = require('../middlewares/auth');

const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const signin = require('./signin');
const signup = require('./signup');
const signout = require('./signout');
const notFoundRoutes = require('./notFound');
const crashTest = require('./crashTest');

allRoutes
  .use('/crash-test', crashTest)
  .use('/signin', signin)
  .use('/signup', signup)
  .use('/signout', signout)
  .use('/users', auth, usersRoutes)
  .use('/cards', auth, cardsRoutes)
  .use('*', auth, notFoundRoutes);

module.exports = allRoutes;
