const { Router } = require("express")
const mainController = require("./controller/main-page")
const phonesController = require("./controller/phones")

const router = Router()

router.get("/", mainController)
router.get("/phones", phonesController.getList)

module.exports = router
