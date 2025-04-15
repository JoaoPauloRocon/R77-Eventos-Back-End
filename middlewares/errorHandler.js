function errorHandler(err, req, res, next) {
    console.error('🔴 Erro:', err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno no servidor';
  
    res.status(statusCode).json({ message });
  }
  
  module.exports = errorHandler;
  