const express = require("express")
const createWsServer = require("./services/ws")
const { createServer } = require("http")
const { isNumber } = require("lodash")
const { join } = require("path")
require("dotenv").config()
const router = require("./router")

const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
// const wsServer = createWsServer(server, app)

const io = new Server(server)

io.on("connection", (socket) => {
  setInterval(() => {
    socket.send("HELLO", { test: 1 })
  }, 4000)
})

const port = parseInt(process.env.PORT_GATEWAY) || 3000

app.set("views", join(__dirname, "views"))
app.set("view engine", "pug")

app.use(express.json())
// app.use((req, res, next) => {
//   req.ws = wsServer
//   next()
// })
app.use(express.static(join(__dirname, "../", "public")))
app.use("/", router)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(isNumber(err.code) ? err.code : 500).send({
    code: err.code || 500,
    message: err.message,
  })
})

server.listen(port)
