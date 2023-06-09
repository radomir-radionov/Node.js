require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')

const {
  PORT = 3000,
  MONGO_INITDB_PORT,
  MONGO_INITDB_HOST,
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD
} = process.env

const app = express()
app.use(express.json())
app.use(userRouter)

async function main() {
  try {
    await mongoose.connect(
      `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_INITDB_HOST}:${MONGO_INITDB_PORT}`
    )
    console.log(`DB is connected to ${MONGO_INITDB_PORT} port`)

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT} port`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
