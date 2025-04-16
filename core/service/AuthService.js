const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../core/entity');
const logger = require('../utils/logger'); // 👈 importa o logger
const { JWT_SECRET } = process.env;

class AuthService {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({ ...userData, password: hashedPassword });

    logger.info(`Novo usuário registrado: ${user.email} (ID: ${user.id})`);

    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn(`Tentativa de login falhou: usuário ${email} não encontrado`);
      throw new Error('Usuário não encontrado');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.warn(`Senha incorreta para o usuário ${email}`);
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info(`Login bem-sucedido: ${email} (ID: ${user.id})`);

    return { token, user };
  }
}

module.exports = new AuthService();
