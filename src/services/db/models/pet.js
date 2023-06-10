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
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 1,
  },
  // health: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   default: 100,
  // },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0,
  },
}