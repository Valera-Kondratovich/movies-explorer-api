const { celebrate, Joi } = require('celebrate');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
});

const createMovieValidation = celebrate({
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
});

const delMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    email: Joi.string().email(),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  createMovieValidation,
  delMovieValidation,
  updateUserValidation,
};
