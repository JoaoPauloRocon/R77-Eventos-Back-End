const Event = require('../entity/Events'); // Importa o modelo de Evento
const BadRequestException = require('../../application/exception/BadRequestException');
const { Op } = require('sequelize');

class EventController {
  // Listar eventos com paginação e busca
  async getAll(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      const offset = (page - 1) * limit;

      const events = await Event.findAll({
        where: {
          title: {
            [Op.like]: `%${search}%`,
          }
        },
        offset,
        limit,
      });

      return res.json(events);
    } catch (err) {
      next(err);
    }
  }

  // Detalhar evento
  async getById(req, res, next) {
    try {
      const event = await Event.findByPk(req.params.id);

      if (!event) {
        throw new BadRequestException('Evento não encontrado');
      }

      return res.json(event);
    } catch (err) {
      next(err);
    }
  }

  // Criar evento
  async create(req, res, next) {
    try {
      const {
        title,
        description,
        date,
        street,
        number,
        neighborhood,
        city,
        state,
        zip_code
      } = req.body;

      const event = await Event.create({
        title,
        description,
        date,
        street,
        number,
        neighborhood,
        city,
        state,
        zip_code,
        created_by: req.user.id, // Pega o ID do usuário autenticado
      });

      return res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  }

  // Atualizar evento
  async update(req, res, next) {
    try {
      const event = await Event.findByPk(req.params.id);

      if (!event) {
        throw new BadRequestException('Evento não encontrado');
      }

      await event.update(req.body);
      return res.json(event);
    } catch (err) {
      next(err);
    }
  }

  // Deletar evento
  async delete(req, res, next) {
    try {
      const event = await Event.findByPk(req.params.id);

      if (!event) {
        throw new BadRequestException('Evento não encontrado');
      }

      await event.destroy();
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EventController();
