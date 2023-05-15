/* eslint-disable linebreak-style */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { CREATED_CODE } = require('../middlewares/errorsCode');

const DublicateErrors = require('../errors/DublicateError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

const findUser = (req, res, data, next) => {
  User
    .findById(data)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан не корректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  findUser(req, res, req.params.userId, next);
};

module.exports.getUserInfo = (req, res, next) => {
  findUser(req, res, req.user._id, next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(CREATED_CODE).send({
        data: {
          name,
          about,
          avatar,
          email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DublicateErrors('Пользователь с указанным email уже зарегистрирован.'));
        return;
      }
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Не корректные данные при создании пользователя ${errorMessage}`));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
      res.send({ message: 'Вы успешно авторизованы' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка авторизации'));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

const changeProfileInfo = (req, res, data, next) => {
  User
    .findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка обновления профиля. Пользователь не найден.');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`Не корректные данные для обновления профиля ${errorMessage}`));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequestError('Не корректный id. Пользователь не найден'));
      } else {
        next(err);
      }
    });
};

module.exports.changeUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  changeProfileInfo(req, res, { name, about }, next);
};

module.exports.changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  changeProfileInfo(req, res, { avatar }, next);
};
