const router = require('express').Router();
const {
  updateUserValidation,
} = require('../middlewares/validation');
const {
  updateUser,
  getUserAboutMe,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserAboutMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
