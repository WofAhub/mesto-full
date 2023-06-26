const jwt = require('jsonwebtoken');

// секретный ключ
const SECRET_KEY = 'some-secret-key';

// проверка токена
function checkToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

// подпись токена
function signToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

module.exports = {
  checkToken,
  signToken,
};
