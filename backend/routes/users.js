const router = require('express').Router();

// const контроллер
const {
  getUsersAll,
  getUserById,
  updateUser,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

const {
  validationUpdateAvatar,
  validationUpdateUser,
  validationGetUser,
} = require('../middlewares/validation');

// получаем текущего пользователя
router.get('/users/me', getMe);

// все пользователи
router.get('/users', getUsersAll);

// пользователь
router.get('/users/:id', validationGetUser, getUserById);

// обновляем профиль
router.patch('/users/me', validationUpdateUser, updateUser);

// обновляем аватар
router.patch('/users/me/avatar', validationUpdateAvatar, updateUserAvatar);

module.exports = router;
