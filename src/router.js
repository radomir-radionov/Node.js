const { Router } = require("express")
const mainController = require("./controller/main-page/index")

const router = Router()

router.get("/", (req, res) => {
  res.render("main", { title: "Main page", message: "hi" })
})

router.get("/cats", (req, res) => {
  res.send("Hello World!")
})

module.exports = router
