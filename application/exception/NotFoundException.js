const AppException = require('./AppException');

class NotFoundException extends AppException {
  constructor(message = 'Recurso não encontrado') {
    super(message, 404);
  }
}

module.exports = NotFoundException;
