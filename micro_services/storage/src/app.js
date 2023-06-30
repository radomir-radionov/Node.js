const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const errorHandler = require('./middleware/global-error-handler')
const initAmqt = require('./services/amqt')

const port = parseInt(process.env.PORT) || 3000

app.use(errorHandler)
app.use(bodyParser())
app.use(router.routes())

app.listen(port, () => {
  console.log(`We are listeting http://127.0.0.1:${port}`)
  setTimeout(async () => {
    await initAmqt()
    console.log('message brocker started successfully')
  }, 10000)
})
