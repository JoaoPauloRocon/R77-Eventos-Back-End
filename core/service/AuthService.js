const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../core/entity');
const { JWT_SECRET } = process.env;

class AuthService {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({ ...userData, password: hashedPassword });
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Senha inválida');

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token, user };
  }
}

module.exports = new AuthService();
