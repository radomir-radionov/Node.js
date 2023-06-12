const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Pets extends Model {
    static associate(models) {
      models.Pets.hasOne(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Pets.init(
    {
      petName: DataTypes.STRING,
      age: DataTypes.INTEGER,
      food: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Pets'
    }
  )
  return Pets
}
