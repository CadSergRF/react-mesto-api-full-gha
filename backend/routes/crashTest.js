const crashTest = require('express').Router();

// crashTest
crashTest.get('/', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

module.exports = crashTest;
