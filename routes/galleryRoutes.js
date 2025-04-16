const express = require('express');
const router = express.Router();
const galleryController = require('../core/controller/GalleryController');

router.get('/', galleryController.getGallery);

module.exports = router;
