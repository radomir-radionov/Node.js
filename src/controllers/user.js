const { User } = require('../services/db')

exports.createUser = async (req, res) => {
  console.log(req.body)
  const user = await User.create(req.body)

  res.send(user)
}
