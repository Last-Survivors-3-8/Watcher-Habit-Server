const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const {
  validateGetHabit,
  validateCreateHabit,
  validateUpdateHabit,
  validateDeleteHabit,
} = require('../middlewares/validateHabit');
const {
  getHabit,
  createHabit,
  updateHaibt,
  deleteHabit,
} = require('../controllers/habitController');
const validateMiddleware = require('../middlewares/validateMiddleware');

const router = express.Router();

router.get('/:habitId', validateGetHabit, validateMiddleware, getHabit);
router.post('/', validateCreateHabit, validateMiddleware, createHabit);
router.patch('/:habitId', validateUpdateHabit, validateMiddleware, updateHaibt);
router.delete(
  '/:habitId',
  validateDeleteHabit,
  validateMiddleware,
  deleteHabit,
);

router.use(commonErrorHandler);

module.exports = router;
