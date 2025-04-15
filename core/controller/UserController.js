const UserService = require('../service/UserService');
const UserResponseDTO = require('../../application/dtos/user/UserResponseDTO');

class UserController {
    async index(req, res, next) {
      try {
        const users = await UserService.findAll();
        return res.json(users.map(UserResponseDTO));
      } catch (err) {
        next(err);
      }
    }
  
    async show(req, res, next) {
      try {
        const id = req.params.id === 'me' || !req.params.id ? req.user.id : req.params.id;
        console.log('🔎 Buscando usuário com ID:', id);
  
        const user = await UserService.findById(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
  
        return res.json(UserResponseDTO(user));
      } catch (err) {
        next(err);
      }
    }
  
    async update(req, res, next) {
      try {
        const updated = await UserService.update(req.params.id, req.body, req.user);
        return res.json(UserResponseDTO(updated));
      } catch (err) {
        next(err);
      }
    }
  
    async delete(req, res, next) {
      try {
        await UserService.delete(req.params.id, req.user);
        return res.status(204).send();
      } catch (err) {
        next(err);
      }
    }
  }

module.exports = new UserController();
