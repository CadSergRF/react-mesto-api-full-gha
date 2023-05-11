const userRoutes = require('express').Router();

const {
  userIdValidate,
  userInfoValidation,
  userAvatarValidation,
} = require('../middlewares/celebrateValidation');

const {
  getUsers,
  getUserById,
  getUserInfo,
  changeUserInfo,
  changeUserAvatar,
} = require('../controllers/users');

// Получение данных всех пользователей
userRoutes.get('/', getUsers);

// Получение информации о пользователе
userRoutes.get('/me', getUserInfo);

// Поиск пользователя по Id
userRoutes.get('/:userId', userIdValidate, getUserById);

// Изменение "Имя" & "О себе"
userRoutes.patch('/me', userInfoValidation, changeUserInfo);

// Изменение аватара
userRoutes.patch('/me/avatar', userAvatarValidation, changeUserAvatar);

module.exports = userRoutes;
