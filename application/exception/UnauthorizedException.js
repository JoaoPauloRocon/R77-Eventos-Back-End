const AppException = require('./AppException');

class UnauthorizedException extends AppException {
  constructor(message = 'Acesso não autorizado') {
    super(message, 401);
  }
}

module.exports = UnauthorizedException;
