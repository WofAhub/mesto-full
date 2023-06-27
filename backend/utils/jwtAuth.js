const jwt = require('jsonwebtoken');

// секретный ключ
const SECRET_KEY = 'some-secret-key';

// проверка токена
function checkToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  checkToken,
};
