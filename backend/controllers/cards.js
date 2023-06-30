// const база
const mongoose = require('mongoose');
const Card = require('../models/card');

// const ошибки
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// получаем карточки
module.exports.getCard = (req, res, next) => {
  Card
    .find({})
    .populate('owner')
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      next(err);
    });
};

// создаем карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card
    .create(
      {
        name,
        link,
        owner: req.user._id,
      },
    )
    .then((card) => res.status(201).send({ data: card }))

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

// удаляем карточку
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card
    .findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      const owner = card.owner.toString();
      const _id = req.user._id.toString();
      if (owner === _id) {
        Card.deleteOne(card)
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Это не Ваша карточка');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Неверный id'));
      } else {
        next(err);
      }
    });
};

// ставим лайк карточке
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена 😔');
    })
    .then((card) => res.status(200).send({ data: card, message: 'Лайк поставлен ❤' }))

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный id карточки ❌'));
      } else {
        next(err);
      }
    });
};

// ставим дизлайк карточке
module.exports.dislikeCard = (req, res, next) => Card
  .findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => {
    throw new NotFoundError('Карточка не найдена 😔');
  })

  .then((card) => res.status(200).send({ data: card, message: 'Лайк убран 💔' }))

  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ValidationError('Некорректный id карточки ❌'));
    } else {
      next(err);
    }
  });
