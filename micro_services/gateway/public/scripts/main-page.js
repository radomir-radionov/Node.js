const connectSocket = () => {
  const socket = new WebSocket("ws://localhost:3000/websocket")

  socket.onopen = function (e) {
    socket.send("Меня зовут Джон")
  }

  socket.onmessage = function (event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`)
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
      )
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log("[close] Соединение прервано")
    }
  }

  socket.onerror = function (error) {
    console.log(`[error]`)
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const carousel = document.getElementById("carousel-container")
  const getProducts = async (path = "product") => {
    const productList = await fetch(`${window.location.href}${path}`).then(
      (res) => res.json()
    )
    productList.forEach((product) => {
      const img = document.createElement("img")
      img.src = product.image
      img.className = "carousel-item"
      img.alt = product.title
      carousel.appendChild(img)
    })
  }

  await getProducts()
  M.Carousel.init(carousel, {})

  const subscribeProductChange = () => {
    console.log("subscrib e caleed")
    getProducts("product/subscribe").finally(() => {
      console.log("fibaly scalled")
      setTimeout(subscribeProductChange, 300)
    })
  }

  //   subscribeProductChange()
  // connectSocket()

  const socket = io("ws://localhost:3000", {
    reconnectionDelayMax: 10000,
  })
  socket.on("HELLO", (e) => {
    console.log(e)
  })
})
