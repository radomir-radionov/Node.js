const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Pets extends Model {
    static associate(models) {
      // if dont work  then add foreign key
      models.Pets.belongsTo(models.User)
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
