const allowedCors = [
  'http://mesto-csrf.nomoredomains.monster',
  'https://mesto-csrf.nomoredomains.monster',
  'http://api.mesto-csrf.nomoredomains.monster',
  'https://api.mesto-csrf.nomoredomains.monster',
  'http://158.160.38.243',
  'https://158.160.38.243',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
