const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../application/config/database');
const User = require('./User');  // Certifique-se de importar corretamente o modelo User

console.log('User Model in Event:', User);  // Adicionando log para verificar o modelo User

class Event extends Model {}

Event.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(2),  // Estado com 2 caracteres
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d{5}-?\d{3}$/, // Aceita o formato 00000-000 ou 00000000
    },
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'events',
  timestamps: true,
});

console.log('Event Model:', Event);  // Adicionando log para verificar o modelo Event

Event.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

module.exports = Event;
