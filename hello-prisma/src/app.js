const { join } = require("path")
const express = require("express")
const router = require("./router")

const app = express()
const port = 3000

app.set("views", join(__dirname, "views"))
app.set("view engine", "pug")

app.use(express.json())
app.use(express.static(join(__dirname, "../", "public")))
app.use("/", router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
