exports.getList = (req, res) => {
  res.send([
    { modal: "X1", year: "2001", id: 1 },
    { modal: "X1", year: "2001", id: 2 },
    { modal: "X1", year: "2001", id: 3 },
  ])
}
