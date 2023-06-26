// const база
const router = require('express').Router();

// const контроллер
const {
  createUser,
  login,
} = require('../controllers/users');

// const валидация
const { validationLogin } = require('../middlewares/validation');
const { validationCreateUser } = require('../middlewares/validation');

// логин
router.post('/signin', validationLogin, login);

// регистрация
router.post('/signup', validationCreateUser, createUser);

module.exports = router;
