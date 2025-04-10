const Joi = require('joi');

const LoginUserDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = LoginUserDTO;
