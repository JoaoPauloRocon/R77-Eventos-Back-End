const AppException = require('./AppException');

class BadRequestException extends AppException {
  constructor(message = 'Requisição inválida') {
    super(400, message);
  }
}

module.exports = BadRequestException;
