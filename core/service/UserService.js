const User = require('../entity/User');

class UserService {
    async findAll() {
        return await User.findAll();
    }


    async findById(id) {
        return await User.findByPk(id); // 👈 Isso deve funcionar corretamente
    }


    async update(id, data, currentUser) {
        if (parseInt(id) !== currentUser.id && currentUser.role !== 'ADMIN') {
            throw new Error('Não autorizado');
        }
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');
        await user.update(data);
        return user;
    }

    async delete(id, currentUser) {
        if (parseInt(id) !== currentUser.id && currentUser.role !== 'ADMIN') {
            throw new Error('Não autorizado');
        }
        const user = await User.findByPk(id);
        if (!user) throw new Error('Usuário não encontrado');
        await user.destroy();
    }
}

module.exports = new UserService();
