const express = require('express');
const router = express.Router();
const userController = require('../core/controller/UserController');
const authenticateToken = require('../middlewares/authMiddleware');
const { isAdmin, isSelfOrAdmin } = require('../middlewares/roleMiddleware');

router.get('/', authenticateToken, isAdmin, userController.index);
router.get('/me', authenticateToken, userController.show);
router.get('/:id', authenticateToken, isSelfOrAdmin, userController.show);
router.put('/:id', authenticateToken, isSelfOrAdmin, userController.update);
router.delete('/:id', authenticateToken, isSelfOrAdmin, userController.delete);

module.exports = router;
