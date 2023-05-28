window.addEventListener('DOMContentLoaded', async () => {
    const productList = await fetch(`${window.location.href}product`).then((res) => res.json())
    const carousel = document.getElementById('carousel-container')
    productList.forEach((product) => {
        const img = document.createElement('img')
        img.src = product.image
        img.className = 'carousel-item'
        img.alt = product.title
        carousel.appendChild(img)
    })
    M.Carousel.init(carousel, {})
})
