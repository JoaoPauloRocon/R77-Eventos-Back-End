const EventService = require('../service/EventService');

class EventController {
  async getAll(req, res, next) {
    try {
      const events = await EventService.listEvents(req.query);
      return res.json(events);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const event = await EventService.getEventById(req.params.id);
      return res.json(event);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const event = await EventService.createEvent(req.body, req.files, req.user.id);
      return res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      let { deleteImages } = req.body;
      if (typeof deleteImages === 'string') deleteImages = JSON.parse(deleteImages);

      const updated = await EventService.updateEvent(req.params.id, req.body, req.files, deleteImages);
      return res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await EventService.deleteEvent(req.params.id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EventController();
