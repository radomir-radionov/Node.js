const { User } = require('../services/db')

exports.createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.send(user)
}
