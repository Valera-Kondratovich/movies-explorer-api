const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const {
  signinValidation,
  signupValidation,
} = require('../middlewares/validation');
const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);

router.use(auth);
router.get('/signout', logout);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
