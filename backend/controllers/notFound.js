const NotFoundError = require('../errors/NotFoundError');

module.exports.urlNotFound = (req, res, next) => {
  next(new NotFoundError('URL не существует'));
};
