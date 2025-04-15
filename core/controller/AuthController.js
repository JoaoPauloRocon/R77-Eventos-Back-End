const AuthService = require('../service/AuthService');
const RegisterUserDTO = require('../../application/dtos/user/RegisterUserDTO');
const LoginUserDTO = require('../../application/dtos/user/LoginUserDTO');
const UserResponseDTO = require('../../application/dtos/user/UserResponseDTO');

class AuthController {
    async register(req, res, next) {
      try {
        const { error, value } = RegisterUserDTO.validate(req.body);
        if (error) {
          throw new BadRequestException(error.details[0].message);
        }
  
        const user = await AuthService.register(value);
        return res.status(201).json(UserResponseDTO(user));
      } catch (err) {
        next(err);
      }
    }
    
    async login(req, res, next) {
      try {
        const { error, value } = LoginUserDTO.validate(req.body);
        if (error) {
          throw new BadRequestException(error.details[0].message);
        }
  
        const { token, user } = await AuthService.login(value.email, value.password);
        return res.json({ token, user: UserResponseDTO(user) });
      } catch (err) {
        next(err);
      }
    }
  }
module.exports = new AuthController();
