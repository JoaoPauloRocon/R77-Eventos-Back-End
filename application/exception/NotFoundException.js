const AppException = require('./AppException');

class NotFoundException extends AppException {
  constructor(message = 'Recurso não encontrado') {
    super(404, message);
  }
}

module.exports = NotFoundException;
