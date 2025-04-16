const Event = require('../entity/Events');
const Image = require('../entity/Image');
const path = require('path');
const fs = require('fs');
const BadRequestException = require('../../application/exception/BadRequestException');
const { Op } = require('sequelize');

class EventService {
  async listEvents({ page = 1, limit = 10, search = '' }) {
    const offset = (page - 1) * limit;
    return await Event.findAll({
      where: { title: { [Op.like]: `%${search}%` } },
      offset,
      limit,
      include: [{ model: Image, as: 'images', attributes: ['filename', 'url'] }],
    });
  }

  async getEventById(id) {
    const event = await Event.findByPk(id, {
      include: [{ model: Image, as: 'images' }],
    });

    if (!event) throw new BadRequestException('Evento não encontrado');
    return event;
  }

  async createEvent(data, files, userId) {
    const event = await Event.create({ ...data, created_by: userId });
    await this._handleImagesUpload(event.id, files);
    return await this.getEventById(event.id);
  }

  async updateEvent(id, data, files, deleteImages) {
    const event = await this.getEventById(id);
    await event.update(data);

    if (deleteImages) await this._deleteImages(deleteImages, event.id);
    if (files?.length) await this._handleImagesUpload(event.id, files);

    return await this.getEventById(event.id);
  }

  async deleteEvent(id) {
    const event = await this.getEventById(id);
    await event.destroy();
  }

  // Lida com o upload de imagens
  async _handleImagesUpload(eventId, files) {
    const uploadDir = path.join(__dirname, '..', '..', 'resources', 'uploads', `${eventId}`);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    for (const file of files) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Extensões permitidas

      // Verifica se a extensão do arquivo é permitida
      if (!allowedExtensions.includes(fileExtension)) {
        fs.unlinkSync(file.path); // Exclui arquivo inválido
        throw new BadRequestException('Tipo de arquivo não permitido. Somente imagens são aceitas.');
      }

      const newPath = path.join(uploadDir, file.filename);

      // Verifica se a imagem já existe no banco de dados para evitar duplicação
      const exists = await Image.findOne({ where: { filename: file.filename, event_id: eventId } });
      if (exists) {
        fs.unlinkSync(file.path); // Exclui arquivo duplicado
        continue;
      }

      // Move o arquivo da pasta temporária para a pasta de destino
      fs.renameSync(file.path, newPath);

      // Cria o registro no banco de dados para a imagem
      await Image.create({
        filename: file.filename,
        url: `/uploads/${eventId}/${file.filename}`,
        event_id: eventId,
        uploadedAt: new Date(),
      });
    }
  }

  // Lida com a exclusão de imagens
  async _deleteImages(imageIds, eventId) {
    for (const imageId of imageIds) {
      const image = await Image.findOne({ where: { id: imageId, event_id: eventId } });
      if (image) {
        const imagePath = path.join(__dirname, '..', '..', 'resources', 'uploads', eventId.toString(), image.filename);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath); // Exclui o arquivo do disco
        await image.destroy(); // Exclui o registro da imagem no banco de dados
      }
    }
  }
}

module.exports = new EventService();
