module.exports = (req, res) => {
  // res.send("Main page!")
  res.render("main", { title: "Main page", message: "hi" })
}
