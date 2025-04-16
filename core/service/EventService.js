const Event = require('../entity/Events');
const Image = require('../entity/Image');
const path = require('path');
const fs = require('fs');
const BadRequestException = require('../../application/exception/BadRequestException');
const { Op } = require('sequelize');
const { paginate, formatDate, generateSlug } = require('../utils'); // Importando os utilitários

class EventService {
  // Atualizando listEvents para usar o utilitário de paginação
  async listEvents({ page = 1, limit = 10, search = '' }) {
    // Garantir que os valores de page e limit são números válidos
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
  
    // Cálculo de offset para paginar corretamente
    const offset = (pageNumber - 1) * limitNumber;
  
    // Usando o paginador para calcular o total de eventos
    const total = await Event.count({ where: { title: { [Op.like]: `%${search}%` } } });
  
    // Chama a função paginate para calcular os dados de paginação
    const pagination = paginate(pageNumber, limitNumber, total);
  
    // Consulta dos eventos com a paginação aplicada
    const events = await Event.findAll({
      where: { title: { [Op.like]: `%${search}%` } },
      offset,
      limit: limitNumber,  // Aplica o limite correto
      include: [{ model: Image, as: 'images', attributes: ['filename', 'url'] }],
    });
  
    // Retorna os eventos e a paginação
    return { events, pagination };
  }

  // Método para retornar o evento com a data formatada
  async getEventById(id) {
    const event = await Event.findByPk(id, {
      include: [{ model: Image, as: 'images' }],
    });

    if (!event) throw new BadRequestException('Evento não encontrado');

    // Usando o formatador de data
    event.formattedDate = formatDate(event.date);
    return event;
  }

  // Método para criar o evento, agora com slug
  async createEvent(data, files, userId) {
    // Gerando o slug para o evento
    const slug = generateSlug(data.title);
    const event = await Event.create({ ...data, created_by: userId, slug });
    
    if (files && files.length) {
      await this._handleImagesUpload(event.id, files);
    }
    return await this.getEventById(event.id);
  }

  // Atualizando o evento, agora com slug
  async updateEvent(id, data, files, deleteImages) {
    const event = await this.getEventById(id);

    // Atualizando o slug caso o título tenha sido modificado
    if (data.title) {
      const slug = generateSlug(data.title);
      data.slug = slug;
    }

    await event.update(data);

    if (deleteImages) await this._deleteImages(deleteImages, event.id);
    if (files?.length) await this._handleImagesUpload(event.id, files);

    return await this.getEventById(event.id);
  }

  // Método para deletar evento
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
