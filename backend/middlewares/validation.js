const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

// логин юзера
const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// создание юзера
const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().regex(URL_REGEX),
  }),
});

// получение юзера
const validationGetUser = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

// обновление автара
const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().regex(URL_REGEX),
  }),
});

// обновление профиля
const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// создание карточки
const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().regex(URL_REGEX),
  }),
});

// валидация айди карточки
const validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationCreateCard,
  validationUpdateAvatar,
  validationUpdateUser,
  validationGetUser,
  validationCardId,
};
