const { got } = require('got-cjs')

exports.getProductsList = () => {
    return got.get('http://localhost:4000/product', { searchParams: { limit: 10 } }).json()
}

exports.addProduct = (json) => {
    return got.post('http://localhost:4000/product', { json }).json()
}

exports.getUserByEmail = (email) => {
    return got.post('http://localhost:4000/login', { json: { email } })
        .json()
        .then(data => data ? data.user : null)
}

exports.createNewUser = (json) => {
    return got.post('http://localhost:4000/user', { json }).json()
}

exports.updateProductImage = (productId, imagePath) => {
    return got.put(`http://localhost:4000/product/${productId}/image`, { json: { imagePath } }).json()
}
