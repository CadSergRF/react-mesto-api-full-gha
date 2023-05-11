const signin = require('express').Router();
const { signinValidation } = require('../middlewares/celebrateValidation');
const { login } = require('../controllers/users');

// Авторизация
signin.post('/', signinValidation, login);

module.exports = signin;
