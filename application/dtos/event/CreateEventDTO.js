const Joi = require('joi');

const CreateEventDTO = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null),
  date: Joi.date().required(),
  street: Joi.string().required(),
  number: Joi.string().required(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(),
  zip_code: Joi.string().required(),
});

module.exports = CreateEventDTO;
