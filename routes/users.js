const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser,
  getUserAboutMe,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserAboutMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(50),
  }),
}), updateUser);

module.exports = router;
