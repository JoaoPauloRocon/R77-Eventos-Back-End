const express = require('express');
const AuthController = require('../core/controller/AuthController');
const loginLimiter = require('../middlewares/rateLimitMiddleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login',loginLimiter, AuthController.login);

module.exports = router;
