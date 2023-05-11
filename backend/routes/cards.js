const cardsRoutes = require('express').Router();
const {
  cardBobyValidation,
  cardIdValidation,
} = require('../middlewares/celebrateValidation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// Получение карточек
cardsRoutes.get('/', getCards);

// Создание карточки
cardsRoutes.post('/', cardBobyValidation, createCard);

// Удаление карточки
cardsRoutes.delete('/:cardId', cardIdValidation, deleteCard);

// Поставить лайк
cardsRoutes.put('/:cardId/likes', cardIdValidation, likeCard);

// Удалить лайк
cardsRoutes.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardsRoutes;
