const mongoose = require('mongoose');
const { checkToken } = require('../utils/jwtAuth');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => { // eslint-disable-line
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = checkToken(token);
    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
    next();
  } catch (err) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
};
