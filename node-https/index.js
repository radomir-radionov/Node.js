const https = require('https')
const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
const port = 8000

const staticPath = path.resolve(__dirname, 'static')
app.use(express.static(staticPath))

const httpsOptions = {
  key: fs.readFileSync(path.resolve((__dirname, './keys/cert.key'))),
  cert: fs.readFileSync(path.resolve((__dirname, './keys/cert.pem')))
}

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Server running on ${port}`)
})
