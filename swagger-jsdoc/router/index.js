const { Router } = require('express')
const userRouter = require('./routes/user.route')
const catRouter = require('./routes/cat.route')

const router = new Router()

router.use('/user', userRouter)
router.use('/cat', catRouter)

module.exports = router
