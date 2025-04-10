// middlewares/rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo de 5 tentativas
  message: {
    message: 'Muitas tentativas de login. Tente novamente após 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginLimiter;
