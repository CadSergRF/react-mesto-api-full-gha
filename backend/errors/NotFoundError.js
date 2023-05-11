const { NOT_FOUND_CODE } = require('../middlewares/errorsCode');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}
module.exports = NotFoundError;
