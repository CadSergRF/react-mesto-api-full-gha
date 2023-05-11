const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "Имя" должно быть заполнено'],
      minlength: [2, 'Символов в названии должно быть от 2 до 30'],
      maxlength: [30, 'Символов в названии должно быть от 2 до 30'],
    },
    link: {
      type: String,
      required: [true, 'Поле "Ссылка" должно быть заполнено'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Не корректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
