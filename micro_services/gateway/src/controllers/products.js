const { getProductsList, addProduct } = require("../services/data-client")
const appSubcriber = require("../utils/app-subscriber")
const { AppError } = require("../utils/app-errors")

exports.getList = async (req, res) => {
  const productList = await getProductsList({ limit: 10 })
  res.send(productList)
}

exports.getListSubscribe = async (req, res, next) => {
  appSubcriber.once("PRODUCT_ADDED", (newProduct) => {
    res.send([newProduct])
  })
  setTimeout(() => {
    next(
      new AppError({
        message: "Timeout",
        code: 504,
      })
    )
  }, 60000)
}

exports.addProduct = async (req, res) => {
  const newProduct = await addProduct(req.body)
  res.send(newProduct)
  req.ws.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        eventName: "PRODUCT_ADDED",
        data: newProduct,
      })
    )
  })
  // req.ws.send(JSON.stringify(newProduct))
  // appSubcriber.emit("PRODUCT_ADDED", newProduct)
}
