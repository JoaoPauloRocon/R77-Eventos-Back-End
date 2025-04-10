const Joi = require('joi');

const DeleteUserDTO = Joi.object({
  password: Joi.string().required()
});

module.exports = DeleteUserDTO;
