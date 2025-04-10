const Joi = require('joi');

const ChangePasswordDTO = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

module.exports = ChangePasswordDTO;
