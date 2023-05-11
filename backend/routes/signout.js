const signout = require('express').Router();
const { logout } = require('../controllers/users');

// Авторизация
signout.post('/', logout);

module.exports = signout;
