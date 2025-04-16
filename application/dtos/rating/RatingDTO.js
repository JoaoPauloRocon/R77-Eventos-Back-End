const Joi = require('joi');

const RatingDTO = Joi.object({
  event_id: Joi.number().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow('', null),  // Comentário é opcional
});

module.exports = RatingDTO;
