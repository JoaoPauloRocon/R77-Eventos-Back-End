const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../application/config/database');
const User = require('./User');

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
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d{5}-?\d{3}$/,
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

Event.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

module.exports = Event;
