// CORS: Разрешенные домены
const ALLOWED_CORS = [
  'http://mesto-csrf.nomoredomains.monster',
  'https://mesto-csrf.nomoredomains.monster',
  'http://api.mesto-csrf.nomoredomains.monster',
  'https://api.mesto-csrf.nomoredomains.monster',
  'http://51.250.1.77',
  'https://51.250.1.77',
  'http://51.250.1.77:3000',
  'https://51.250.1.77:3000',
  'http://localhost:3000',
];

// CORS: Разрешенные методы
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
