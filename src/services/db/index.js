const sequelize = require('./instance')
const user = require('./models/user')
const pet = require('./models/pet')

const User = sequelize.define('User', user)
const Pet = sequelize.define('Pet', pet)

User.hasMany(Pet)
Pet.belongsTo(User)

module.exports = {
  sequelize,
  User,
  Pet,
}