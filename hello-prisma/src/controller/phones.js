const phones = require("../models/phones")

exports.getList = async (req, res) => {
  const phonesList = await phones.getList({ limit: 10 })

  res.send(phonesList)
}
