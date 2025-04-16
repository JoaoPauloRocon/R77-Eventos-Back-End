const Joi = require('joi');

const UpdateEventDTO = Joi.object({
  id: Joi.number().integer().positive().optional(), // id opcional
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null).required(),
  date: Joi.date().iso().required(),
  street: Joi.string().min(3).required(),
  number: Joi.string().required(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(),
  zip_code: Joi.string().pattern(/^\d{5}-?\d{3}$/).required(),
  deleteImages: Joi.string().allow('', null).optional()
});

module.exports = UpdateEventDTO;
