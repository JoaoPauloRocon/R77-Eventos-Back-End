function isAdmin(req, res, next) {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Acesso negado. Requer perfil ADMIN.' });
    }
    next();
  }
  
  function isSelfOrAdmin(req, res, next) {
    if (req.user.role === 'ADMIN' || req.user.id === parseInt(req.params.id)) {
      return next();
    }
    return res.status(403).json({ message: 'Acesso negado.' });
  }
  
  module.exports = { isAdmin, isSelfOrAdmin };
  