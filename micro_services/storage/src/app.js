const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const errorHandler = require('./middleware/global-error-handler')

const port = parseInt(process.env.PORT) || 4000

app.use(errorHandler)
app.use(bodyParser())
app.use(router.routes())

app.listen(port)
