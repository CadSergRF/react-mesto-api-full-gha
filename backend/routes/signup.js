const signup = require('express').Router();
const { signupValidation } = require('../middlewares/celebrateValidation');
const { createUser } = require('../controllers/users');

// Регистрация
signup.post('/', signupValidation, createUser);

module.exports = signup;
