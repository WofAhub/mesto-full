const jwt = require('jsonwebtoken');

// const, связанный с env
const { NODE_ENV, JWT_SECRET } = process.env;

// проверка токена
function checkToken(token) {
  return jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
}

// подпись токена
function signToken(payload) {
  return jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
}

module.exports = {
  checkToken,
  signToken,
};
