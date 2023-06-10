const { DataTypes } = require('sequelize')

module.exports = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0,
    validate: { min: 0 }
  },
}