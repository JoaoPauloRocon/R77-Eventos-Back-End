// routes/events.routes.js

const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');
const eventController = require('../core/controller/EventController'); // Importação correta do controlador de eventos
const router = express.Router();

// GET /events - Lista de eventos com paginação e busca
router.get('/', eventController.getAll);

// GET /events/:id - Detalhes de um evento específico
router.get('/:id', eventController.getById);

// POST /events - Criação de um novo evento (somente admin)
router.post('/', authenticateToken, isAdmin, eventController.create);

// PUT /events/:id - Atualização de um evento específico (somente admin)
router.put('/:id', authenticateToken, isAdmin, eventController.update);

// DELETE /events/:id - Deletar um evento específico (somente admin)
router.delete('/:id', authenticateToken, isAdmin, eventController.delete);

module.exports = router;
