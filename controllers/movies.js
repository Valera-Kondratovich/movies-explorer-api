const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const Forbidden = require('../errors/forbidden');
const IncorrectDataError = require('../errors/incorrectDataError');
const { log } = require('winston');

const getMovie = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const newMovie = {
    ...req.body,
    owner: req.user._id,
  };
  Movie.create(newMovie)
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Введены некорректные данные'));
        return;
      }
      next(err);
    });
};

const delMovie = (req, res, next) => {
  console.log(req);
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найдена'))
    .then((movie) => {
console.log(movie.owner.equals(req.user._id));
      if (movie.owner.equals(req.user._id)) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.status(200).send({ message: 'Фильм удален' }))
          .catch(next);
      } else next(new Forbidden('Нет прав на удаления фильма'));
    })
    .catch(next);
};

// const likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(new NotFoundError('Карточка не найдена'))
//     .then((card) => res.status(200).send(card))
//     .catch(next);
// };

// const dislikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail(new NotFoundError('Карточка не найдена'))
//     .then((card) => res.status(200).send(card))
//     .catch(next);
// };

module.exports = {
  getMovie,
  createMovie,
  delMovie,
};
