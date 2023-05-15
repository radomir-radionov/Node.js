const bcrypt = require("bcrypt");

const salt = "$2b$10$0NXYIuhomrZ6WikjzvISM.hvAKaTon3EsIom0zIYUQ65ws0rxx7/S";

exports.createPasswordHash = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
