const BadRequestException = require('../application/exception/BadRequestException');

const validateRequest = (schema) => (req, res, next) => {
  const data = { ...req.body, ...req.params, ...req.query };

  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const details = error.details.map(detail => detail.message).join(', ');
    return next(new BadRequestException(`Erro de validação: ${details}`));
  }

  next();
};

module.exports = validateRequest;
