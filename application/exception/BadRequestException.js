const HttpException = require('./HttpException');

class BadRequestException extends HttpException {
  constructor(message = 'Requisição inválida') {
    super(400, message);
  }
}

module.exports = BadRequestException;
