const { Model, DataTypes } = require('sequelize');
const sequelize = require("../../application/config/database");
const Event = require('./Events');
const User = require('./User');

class Rating extends Model {}

Rating.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Rating',
  }
);

// Relacionamentos
Rating.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
Rating.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Rating;
