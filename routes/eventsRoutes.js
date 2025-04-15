const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const authenticateToken = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');
const eventController = require('../core/controller/EventController');

const router = express.Router();

// Configuração do armazenamento temporário para imagens
const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, '..', 'resources', 'uploads', 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Inicializa o multer
const upload = multer({
  storage: tempStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Apenas arquivos de imagem são permitidos.'));
    }
    cb(null, true);
  }
});

// Rotas
router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.post('/', authenticateToken, isAdmin, upload.array('images'), eventController.create);
router.put('/:id', authenticateToken, isAdmin, upload.array('images'), eventController.update);
router.delete('/:id', authenticateToken, isAdmin, eventController.delete);

module.exports = router;
