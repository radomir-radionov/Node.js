const { getProductsList, addProduct } = require('../services/data-client')

exports.getList = async (req, res) => {
    const productList = await getProductsList({ limit: 10 })
    res.send(productList)
}

exports.addProduct = async (req, res) => {
    const newProduct = await addProduct(req.body)
    res.send(newProduct)
}
