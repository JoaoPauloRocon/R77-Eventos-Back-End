const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../application/config/database');

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Image',
    tableName: 'images',
    timestamps: false,
  }
);

module.exports = Image;
