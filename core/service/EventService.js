const Event = require('../entity/Events');
const Image = require('../entity/Image');
const path = require('path');
const fs = require('fs');
const BadRequestException = require('../../application/exception/BadRequestException');
const { Op } = require('sequelize');
const { paginate, formatDate, generateSlug } = require('../utils');
const logger = require('../utils/logger'); // 👈 importa o logger

class EventService {
  async listEvents({ page = 1, limit = 10, search = '' }) {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    const total = await Event.count({ where: { title: { [Op.like]: `%${search}%` } } });
    const pagination = paginate(pageNumber, limitNumber, total);

    const events = await Event.findAll({
      where: { title: { [Op.like]: `%${search}%` } },
      offset,
      limit: limitNumber,
      include: [{ model: Image, as: 'images', attributes: ['filename', 'url'] }],
    });

    logger.info(`Listando eventos (página ${pageNumber}, limite ${limitNumber}, busca: "${search}") - Total: ${total}`);
    return { events, pagination };
  }

  async getEventById(id) {
    const event = await Event.findByPk(id, {
      include: [{ model: Image, as: 'images' }],
    });

    if (!event) {
      logger.warn(`Evento com ID ${id} não encontrado`);
      throw new BadRequestException('Evento não encontrado');
    }

    event.formattedDate = formatDate(event.date);
    logger.info(`Evento ${id} carregado com sucesso`);
    return event;
  }

  async createEvent(data, files, userId) {
    const slug = generateSlug(data.title);
    const event = await Event.create({ ...data, created_by: userId, slug });

    logger.info(`Evento "${data.title}" criado pelo usuário ${userId} (ID: ${event.id})`);

    if (files && files.length) {
      await this._handleImagesUpload(event.id, files);
    }

    return await this.getEventById(event.id);
  }

  async updateEvent(id, data, files, deleteImages) {
    const event = await this.getEventById(id);

    if (data.title) {
      const slug = generateSlug(data.title);
      data.slug = slug;
    }

    await event.update(data);
    logger.info(`Evento ${id} atualizado`);

    if (deleteImages) {
      await this._deleteImages(deleteImages, event.id);
      logger.info(`Imagens deletadas do evento ${id}: ${deleteImages}`);
    }

    if (files?.length) {
      await this._handleImagesUpload(event.id, files);
      logger.info(`Novas imagens adicionadas ao evento ${id}`);
    }

    return await this.getEventById(event.id);
  }

  async deleteEvent(id) {
    const event = await this.getEventById(id);
    await event.destroy();
    logger.info(`Evento ${id} deletado`);
  }

  async _handleImagesUpload(eventId, files) {
    const uploadDir = path.join(__dirname, '..', '..', 'resources', 'uploads', `${eventId}`);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    for (const file of files) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

      if (!allowedExtensions.includes(fileExtension)) {
        fs.unlinkSync(file.path);
        logger.warn(`Arquivo com extensão inválida rejeitado: ${file.originalname}`);
        throw new BadRequestException('Tipo de arquivo não permitido. Somente imagens são aceitas.');
      }

      const newPath = path.join(uploadDir, file.filename);
      const exists = await Image.findOne({ where: { filename: file.filename, event_id: eventId } });

      if (exists) {
        fs.unlinkSync(file.path);
        logger.info(`Imagem duplicada ignorada: ${file.filename}`);
        continue;
      }

      fs.renameSync(file.path, newPath);

      await Image.create({
        filename: file.filename,
        url: `/uploads/${eventId}/${file.filename}`,
        event_id: eventId,
        uploadedAt: new Date(),
      });

      logger.info(`Imagem salva: ${file.filename} para evento ${eventId}`);
    }
  }

  async _deleteImages(imageIds, eventId) {
    for (const imageId of imageIds) {
      const image = await Image.findOne({ where: { id: imageId, event_id: eventId } });
      if (image) {
        const imagePath = path.join(__dirname, '..', '..', 'resources', 'uploads', eventId.toString(), image.filename);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        await image.destroy();
        logger.info(`Imagem ${imageId} deletada do evento ${eventId}`);
      }
    }
  }
}

module.exports = new EventService();
