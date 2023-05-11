const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Символов в названии должно быть от 2 до 30'],
      maxlength: [30, 'Символов в названии должно быть от 2 до 30'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Символов в названии должно быть от 2 до 30'],
      maxlength: [30, 'Символов в названии должно быть от 2 до 30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Не корректный URL',
      },
    },
    email: {
      type: String,
      required: [true, 'Полу "email" долдно быть заполнено'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Не корректный e-mail',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "Пароль" должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email }).select('+password')
          .then((user) => {
            if (!user) {
              throw new AuthError('Неправильные почта или пароль');
            }
            // Сравниваем пароли
            return bcrypt.compare(password, user.password)
              .then((matched) => {
                if (!matched) {
                  throw new AuthError('Неправильные почта или пароль');
                }
                return user;
              });
          });
      },
    },
  },
);

module.exports = mongoose.model('user', userSchema);
