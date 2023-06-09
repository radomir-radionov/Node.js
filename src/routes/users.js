const { Router } = require('express')
const User = require('../models/User')

const router = Router()

router.get('/users', async (req, res) => {
  const users = await User.find({}, { __v: 0 })
  res.send(users)
})

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      res.send(user)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/users', async (req, res) => {
  try {
    console.log(req.body)
    const newUser = new User(req.body)

    await newUser.save()
    res.status(201).send(newUser)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    console.log(user)
    res.status(201).send(user)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
