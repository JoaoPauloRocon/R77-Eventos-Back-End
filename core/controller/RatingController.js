const RatingService = require('../service/RatingService');
const BadRequestException = require('../../application/exception/BadRequestException');

class RatingController {
    // Criar uma nova avaliação
    async create(req, res, next) {
        try {
            const event_id = req.params.id;
            const { rating, comment } = req.body;
            const userId = req.user.id; // ID do usuário autenticado
            console.log(event_id, rating, comment, userId);

            // Usa o RatingService para criar a avaliação
            const newRating = await RatingService.createRating(event_id, userId, rating, comment);

            return res.status(201).json(newRating);
        } catch (err) {
            next(err);
        }
    }

    // Listar avaliações de um evento
    async getByEventId(req, res, next) {
        try {
            const eventId = req.params.id;

            // Usa o RatingService para listar as avaliações do evento
            const ratings = await RatingService.getRatingsByEventId(eventId);

            return res.json(ratings);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new RatingController();
