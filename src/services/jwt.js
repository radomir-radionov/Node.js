const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants/encryptionKeys");

module.exports = {
  sign: (data) => jwt.sign(data, jwtSecret, { expiresIn: "30 days" }),
  verify: (token) => jwt.verify(token, jwtSecret),
};
