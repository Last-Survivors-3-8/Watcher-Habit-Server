const express = require('express');
const { validateGetUser } = require('../middlewares/validateUser');
const validateMiddleware = require('../middlewares/validateMiddleware');
const eventsController = require('../controllers/eventsController');

const router = express.Router();

router.get(
  '/',
  validateGetUser.validateUserIdInQuery,
  validateMiddleware,
  eventsController.handleSSEConnection,
);

module.exports = router;
