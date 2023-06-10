require("dotenv").config()

const express = require('express')
const router = require('./src/router')
const { sequelize } = require('./src/services/db')
const app = express()

const port = process.env.APP_PORT || 3000

app.use(express.json())
app.use(router)

async function main () {
  await sequelize.sync({
    // force: process.env.NODE_ENV === 'development',
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

main()