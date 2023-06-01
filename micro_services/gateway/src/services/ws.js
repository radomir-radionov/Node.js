const { Server } = require("ws")

module.exports = (server, app) => {
  const wsServer = new Server({ server })

  wsServer.on("connection", (socket) => {
    socket.on("message", (message) => console.log(message.toString()))
  })

  app.on("upgrade", (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connection", socket, request)
    })
  })

  return wsServer
}
