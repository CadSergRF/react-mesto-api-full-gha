const notFoundRoutes = require('express').Router();

const { urlNotFound } = require('../controllers/notFound');

notFoundRoutes.use('/*', urlNotFound);

module.exports = notFoundRoutes;
