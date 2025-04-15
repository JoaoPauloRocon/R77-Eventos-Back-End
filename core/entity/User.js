const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../application/config/database");
const RoleEnum = require("../../application/enums/RoleEnum");

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(...Object.values(RoleEnum)),
    allowNull: false,
    defaultValue: RoleEnum.USER
  },
}, {
  sequelize,
  modelName: "User", // Certifique-se de que isso está correto
  tableName: "users",
  timestamps: true,
});

module.exports = User;
