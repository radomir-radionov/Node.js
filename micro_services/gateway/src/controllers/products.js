const { getProductsList, addProduct } = require("../services/data-client")
const appSubcriber = require("../utils/app-subscriber")
const { AppError } = require("../utils/app-errors")

exports.getList = async (req, res) => {
  const productList = await getProductsList({ limit: 10 })
  res.send(productList)
}

exports.getListSubscribe = async (req, res, next) => {
  appSubcriber.once("PRODUCT_ADDED", async (newProduct) => {
    res.send([newProduct])
  })

  setTimeout(() => {
    next(new AppError({ message: "Timeout", code: 504 }))
  }, 60000)
}

exports.addProduct = async (req, res) => {
  const newProduct = await addProduct(req.body)
  appSubcriber.emit("PRODUCT_ADDED", newProduct)
  res.send(newProduct)
}
