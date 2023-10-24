const express = require('express');
const commonErrorHandler = require('../middlewares/commonErrorHandler');
const healthController = require('../controllers/healthController');

const router = express.Router();

/**
 * health check api
 * /health
 */
router.get('/', healthController.checkHealth);

router.use(commonErrorHandler);

module.exports = router;
