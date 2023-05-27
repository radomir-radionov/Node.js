const { Router } = require("express")
const mainController = require("./controller/main-page")
const productController = require("./controller/product")
const asyncErrorHandler = require("./utils/async-error-handler")

const router = Router()

router.get("/", mainController)
router.get("/product", asyncErrorHandler(productController.getList))
router.post("/product", asyncErrorHandler(productController.addProduct))

module.exports = router
