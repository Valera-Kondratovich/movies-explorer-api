const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Пользователь',
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      lowercase: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Ввели некорректный email',
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Поле "password" должно быть заполнено'],
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
