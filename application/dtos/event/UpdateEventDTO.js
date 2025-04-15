const Joi = require('joi');

const UpdateEventDTO = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow('', null),
  date: Joi.date().iso(),
  street: Joi.string().min(3),
  number: Joi.string(),
  neighborhood: Joi.string(),
  city: Joi.string(),
  state: Joi.string().length(2),
  zip_code: Joi.string().pattern(/^\d{5}-?\d{3}$/),
});

module.exports = UpdateEventDTO;
