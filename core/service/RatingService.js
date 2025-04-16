const Rating = require('../entity/Rating');
const Event = require('../entity/Events');
const User = require('../entity/User');
const BadRequestException = require('../../application/exception/BadRequestException');

class RatingService {
  // Criar avaliação
  async createRating(eventId, userId, rating, comment) {
    // Verifica se o evento existe
    const event = await Event.findByPk(eventId);
    console.log(eventId, userId, rating, comment);
    if (!event) throw new BadRequestException('Evento não encontrado');

    // Verifica se o usuário já avaliou o evento
    const existingRating = await Rating.findOne({ where: { event_id: eventId, user_id: userId } });
    if (existingRating) throw new BadRequestException('Você já avaliou este evento.');

    // Cria a nova avaliação
    const newRating = await Rating.create({
      event_id: eventId,
      user_id: userId,
      rating,
      comment,
    });

    return newRating;
  }

  // Listar avaliações de um evento
  async getRatingsByEventId(eventId) {
    // Verifica se o evento existe
    const event = await Event.findByPk(eventId);
    if (!event) throw new BadRequestException('Evento não encontrado');

    // Busca as avaliações do evento
    const ratings = await Rating.findAll({
      where: { event_id: eventId },
      include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
    });

    return ratings;
  }
}

module.exports = new RatingService();
