const router = require('express').Router();

// const контроллер
const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// const валидация
const {
  validationCreateCard,
  validationCardId,
} = require('../middlewares/validation');

// получаем
router.get('/cards', getCard);

// создаем
router.post('/cards', validationCreateCard, createCard);

// удаляем
router.delete('/cards/:cardId', validationCardId, deleteCard);

// лайк
router.put('/cards/:cardId/likes', validationCardId, likeCard);

// дизлайк
router.delete('/cards/:cardId/likes', validationCardId, dislikeCard);

module.exports = router;
