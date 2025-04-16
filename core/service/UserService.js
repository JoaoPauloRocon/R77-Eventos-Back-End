const User = require('../entity/User');
const logger = require('../utils/logger');

class UserService {
    async findAll() {
        logger.info('Buscando todos os usuários');
        return await User.findAll();
    }

    async findById(id) {
        logger.info(`Buscando usuário com ID: ${id}`);
        const user = await User.findByPk(id);
        if (!user) {
            logger.warn(`Usuário não encontrado com ID: ${id}`);
        }
        return user;
    }

    async update(id, data, currentUser) {
        logger.info(`Tentando atualizar usuário com ID: ${id} pelo usuário: ${currentUser.id}`);

        if (parseInt(id) !== currentUser.id && currentUser.role !== 'ADMIN') {
            logger.warn(`Atualização não autorizada para o usuário: ${currentUser.id}`);
            throw new Error('Não autorizado');
        }

        const user = await User.findByPk(id);
        if (!user) {
            logger.error(`Usuário com ID ${id} não encontrado para atualização`);
            throw new Error('Usuário não encontrado');
        }

        await user.update(data);
        logger.info(`Usuário com ID ${id} atualizado com sucesso`);
        return user;
    }

    async delete(id, currentUser) {
        logger.info(`Tentando deletar usuário com ID: ${id} pelo usuário: ${currentUser.id}`);

        if (parseInt(id) !== currentUser.id && currentUser.role !== 'ADMIN') {
            logger.warn(`Exclusão não autorizada para o usuário: ${currentUser.id}`);
            throw new Error('Não autorizado');
        }

        const user = await User.findByPk(id);
        if (!user) {
            logger.error(`Usuário com ID ${id} não encontrado para exclusão`);
            throw new Error('Usuário não encontrado');
        }

        await user.destroy();
        logger.info(`Usuário com ID ${id} deletado com sucesso`);
    }
}

module.exports = new UserService();
