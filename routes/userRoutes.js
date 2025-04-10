const express = require('express');
const router = express.Router();
const userController = require('../core/controller/UserController');
const authenticateToken = require('../middlewares/authMiddleware');
const { isAdmin, isSelfOrAdmin } = require('../middlewares/roleMiddleware');

router.get('/users', authenticateToken, isAdmin, userController.index);
router.get('/users/me', authenticateToken, userController.show);
router.get('/users/:id', authenticateToken, isSelfOrAdmin, userController.show);
router.put('/users/:id', authenticateToken, isSelfOrAdmin, userController.update);
router.delete('/users/:id', authenticateToken, isSelfOrAdmin, userController.delete);

module.exports = router;
