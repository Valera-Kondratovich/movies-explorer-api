const router = require('express').Router();
const {
  createMovieValidation,
  delMovieValidation,
} = require('../middlewares/validation');
const {
  getMovie,
  createMovie,
  delMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovie);

// создаёт фильм
router.post('/', createMovieValidation, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', delMovieValidation, delMovie);

module.exports = router;
