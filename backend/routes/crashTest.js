const crashTest = require('express').Router();

// Краш тест
crashTest.get('/', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

module.exports = crashTest;
