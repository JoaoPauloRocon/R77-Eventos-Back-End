const Joi = require('joi');

const CreateEventDTO = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null),
  date: Joi.date().iso().required(),
  street: Joi.string().min(3).required(),
  number: Joi.string().required(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(), // Ex: SP, RJ
  zip_code: Joi.string().pattern(/^\d{5}-?\d{3}$/).required(), // Aceita 00000-000 ou 00000000
});

module.exports = CreateEventDTO;
