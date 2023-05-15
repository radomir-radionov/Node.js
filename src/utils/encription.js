const bcrypt = require("bcrypt");
const { encryptionKeys } = require("../constants/encryptionKeys");

exports.createPasswordHash = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, encryptionKeys.passwordSalt, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
