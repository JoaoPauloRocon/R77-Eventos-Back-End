const express = require('express');
const RatingController = require('../core/controller/RatingController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Criar avaliação
router.post('/:id', authenticateToken, RatingController.create);

// Listar avaliações de um evento
router.get('/:id', RatingController.getByEventId);

module.exports = router;
