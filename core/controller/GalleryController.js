const { Op } = require('sequelize');
const Image = require('../entity/Image');
const Event = require('../entity/Events');

class GalleryController {
  async getGallery(req, res, next) {
    try {
      const { event_id, startDate, endDate } = req.query;

      const where = {};
      if (event_id) where.event_id = event_id;
      if (startDate || endDate) {
        where.uploadedAt = {};
        if (startDate) where.uploadedAt[Op.gte] = new Date(startDate);
        if (endDate) where.uploadedAt[Op.lte] = new Date(endDate);
      }

      const images = await Image.findAll({
        where,
        include: [{
          model: Event,
          as: 'event',
          attributes: ['id', 'title', 'date', 'city'],
        }],
        order: [['uploadedAt', 'DESC']],
      });

      res.json(images);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new GalleryController();
