const Card = require('../models/card');

const { CREATED_CODE } = require('../middlewares/errorsCode');

const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;
  Card
    .create({ name, link, owner: ownerID })
    .then((card) => card.populate('owner'))
    .then((card) => {
      res.status(CREATED_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Не корректные данные при создании карточки ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
      return Card.deleteOne(card._id)
        .then(() => res.send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан не корректный id для удаления карточки'));
      } else {
        next(err);
      }
    });
};

const changeLikesCard = (req, res, changeLikesParam, next) => {
  Card
    .findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена. Не корректный Id.');
      }
      return Card
        .findByIdAndUpdate(
          req.params.cardId,
          changeLikesParam,
          { new: true },
        )
        .then((cardUpdate) => cardUpdate.populate(['owner', 'likes']))
        .then((cardUpdate) => {
          res.send(cardUpdate);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Ошибка при установке||удаления лайка'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const changeLikesParam = { $addToSet: { likes: req.user._id } };
  changeLikesCard(req, res, changeLikesParam, next);
};

module.exports.dislikeCard = (req, res, next) => {
  const changeLikesParam = { $pull: { likes: req.user._id } };
  changeLikesCard(req, res, changeLikesParam, next);
};
