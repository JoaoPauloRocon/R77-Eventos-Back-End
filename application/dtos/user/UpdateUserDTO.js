const Joi = require('joi');

const UpdateUserDTO = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('USER', 'ADMIN').optional()
});

module.exports = UpdateUserDTO;
