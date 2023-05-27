const product = require("../models/product")

exports.getList = async (req, res) => {
  const productList = await product.getList({ limit: 1 })

  res.send(productList)
}

exports.addProduct = async (req, res) => {
  const phone = await product.addProduct(req.body)
  res.send(phone)
}
