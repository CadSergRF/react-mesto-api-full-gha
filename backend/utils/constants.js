// CORS: Разрешенные домены
const ALLOWED_CORS = [
  'http://mesto-csrf.nomoredomains.monster',
  'https://mesto-csrf.nomoredomains.monster',
  'http://api.mesto-csrf.nomoredomains.monster',
  'https://api.mesto-csrf.nomoredomains.monster',
  'http://158.160.60.104',
  'https://158.160.60.104',
  'http://localhost:3000',
  'http://localhost:3001',
  '*',
];

// CORS: Разрешенные методы
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
