// const база
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');

// const подпись токена
const { signToken } = require('../utils/jwtAuth');

// const ошибки
const MONGO_DUBLICATE_ERROR = 11000;
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const DublicateError = require('../errors/DublicateError');

// соль
const SAULT_ROUNDS = 10;

// создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, SAULT_ROUNDS)
    .then((hash) => User
      .create(
        {
          name,
          about,
          avatar,
          email,
          password: hash,
        },
      ))
    .then((user) => {
      res.status(201)
        .send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const errorFields = Object.keys(err.errors);
        const errorMessage = err.errors[errorFields[0]].message;

        next(new ValidationError(errorMessage));
      } else if (err.code === MONGO_DUBLICATE_ERROR) {
        next(new DublicateError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

// авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = signToken({
        _id: user._id,
      });
      res.status(200).send({ token });
    })
    .catch(next);
};

// получаем всех пользователей
module.exports.getUsersAll = (req, res, next) => {
  User
    .find({})
    .orFail(() => {
      throw new NotFoundError('Пользователи не найдены');
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

// получаем пользователя по id
module.exports.getUserById = (req, res, next) => {
  User
    .findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })

    .then((user) => res
      .status(200)
      .send({ data: user }))

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

// поиск меня
module.exports.getMe = (req, res, next) => {
  User
    .findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((user) => res
      .status(200)
      .send({ data: user }))

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

// обновляем пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
    .then((user) => res.status(200).send({ data: user }))

    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const errorFields = Object.keys(err.errors);
        const errorMessage = err.errors[errorFields[0]].message;

        next(new ValidationError(errorMessage));
      } else {
        next(err);
      }
    });
};

// обновляем аватар пользователя
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => res.status(200).send({ data: user }))

    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const errorFields = Object.keys(err.errors);
        const errorMessage = err.errors[errorFields[0]].message;

        next(new ValidationError(errorMessage));
      } else {
        next(err);
      }
    });
};
