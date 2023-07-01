const { randomUUID } = require('crypto')

exports.getUsers = (req, res) => {
  res.send([
    {
      user_id: randomUUID(),
      name: 'User1',
      status: 'active'
    },
    {
      user_id: randomUUID(),
      name: 'User2',
      status: 'active'
    },
    {
      user_id: randomUUID(),
      name: 'User3',
      status: 'banned'
    }
  ])
}

exports.createUser = (req, res) => {
  console.log(req.body)
  res.send([
    {
      user_id: randomUUID(),
      status: 'active',
      ...req.body
    }
  ])
}
