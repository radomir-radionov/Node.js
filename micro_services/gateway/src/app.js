const express = require("express")
const { isNumber } = require("lodash")
const { join } = require("path")
require("dotenv").config()
const router = require("./router")

const app = express()
const port = parseInt(process.env.PORT_GATEWAY) || 3000

app.set("views", join(__dirname, "views"))
app.set("view engine", "pug")

app.use(express.json())
app.use(express.static(join(__dirname, "../", "public")))
app.use("/", router)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(isNumber(err.code) ? err.code : 500).send({
    code: err.code || 500,
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
