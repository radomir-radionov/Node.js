const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // if dont work  then add foreign key
    static associate(models) {
      models.User.hasMany(models.Pets)
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      mood: DataTypes.STRING,
      age: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'User'
    }
  )
  return User
}
