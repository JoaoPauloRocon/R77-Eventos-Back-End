const UserService = require('../service/UserService');
const UserResponseDTO = require('../../application/dtos/user/UserResponseDTO');

class UserController {
  async index(req, res) {
    const users = await UserService.findAll();
    return res.json(users.map(UserResponseDTO));
  }
  
  async show(req, res) {
    // Se veio de /users/me ou não tem parâmetro, usa o ID do token
    const id = req.params.id === 'me' || !req.params.id ? req.user.id : req.params.id;
  
    console.log('🔎 Buscando usuário com ID:', id);
    const user = await UserService.findById(id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  
    return res.json(UserResponseDTO(user));
  }
  
  

  async update(req, res) {
    const updated = await UserService.update(req.params.id, req.body, req.user);
    return res.json(UserResponseDTO(updated));
  }

  async delete(req, res) {
    await UserService.delete(req.params.id, req.user);
    return res.status(204).send();
  }
}

module.exports = new UserController();
