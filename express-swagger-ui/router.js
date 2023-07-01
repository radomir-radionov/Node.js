const { Router } = require('express')
const userController = require('./controllers/user-controller')

const router = new Router()

router.get('/user', userController.getUsers)
router.post(
  '/user',
  (req, res, next) => {
    if (!req.headers.authorization) {
      return next(new Error('Unauthorized'))
    }
    next()
  },
  userController.createUser
)

module.exports = router
