const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovie,
  createMovie,
  delMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovie);

// создаёт фильм
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/w?w?w?\.?[\w-]*\.[a-z0-9]*\/?[\w\-.+*()$[\]~:/?]+#?$/i),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/w?w?w?\.?[\w-]*\.[a-z0-9]*\/?[\w\-.+*()$[\]~:/?]+#?$/i),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/w?w?w?\.?[\w-]*\.[a-z0-9]*\/?[\w\-.+*()$[\]~:/?]+#?$/i),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), delMovie);

module.exports = router;
