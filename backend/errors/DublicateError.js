const { DUPLICATE_KEY_ERROR } = require('../middlewares/errorsCode');

class DublicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_KEY_ERROR;
  }
}
module.exports = DublicateError;
