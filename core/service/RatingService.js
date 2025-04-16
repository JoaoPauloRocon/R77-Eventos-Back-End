const Rating = require('../entity/Rating');
const Event = require('../entity/Events');
const User = require('../entity/User');
const BadRequestException = require('../../application/exception/BadRequestException');
const logger = require('../utils/logger'); // 👈 importa o logger

class RatingService {
  // Criar avaliação
  async createRating(eventId, userId, rating, comment) {
    logger.info(`Usuário ${userId} está tentando avaliar o evento ${eventId}`);

    const event = await Event.findByPk(eventId);
    if (!event) {
      logger.warn(`Evento ${eventId} não encontrado`);
      throw new BadRequestException('Evento não encontrado');
    }

    const existingRating = await Rating.findOne({ where: { event_id: eventId, user_id: userId } });
    if (existingRating) {
      logger.warn(`Usuário ${userId} já avaliou o evento ${eventId}`);
      throw new BadRequestException('Você já avaliou este evento.');
    }

    const newRating = await Rating.create({
      event_id: eventId,
      user_id: userId,
      rating,
      comment,
    });

    logger.info(`Usuário ${userId} avaliou o evento ${eventId} com nota ${rating}`);
    return newRating;
  }

  // Listar avaliações de um evento
  async getRatingsByEventId(eventId) {
    logger.info(`Listando avaliações do evento ${eventId}`);

    const event = await Event.findByPk(eventId);
    if (!event) {
      logger.warn(`Tentativa de buscar avaliações de evento inexistente ${eventId}`);
      throw new BadRequestException('Evento não encontrado');
    }

    const ratings = await Rating.findAll({
      where: { event_id: eventId },
      include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
    });

    logger.info(`Evento ${eventId} tem ${ratings.length} avaliação(ões)`);
    return ratings;
  }
}

module.exports = new RatingService();
