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
      subscribeProductChange()
    })
  }

  subscribeProductChange()
})
