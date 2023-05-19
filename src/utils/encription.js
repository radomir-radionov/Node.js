const argon2 = require("argon2");
const { passwordSalt } = require("../constants/encryptionKeys");

exports.createPasswordHash = (password) => {
  try {
    return argon2.hash(password, { salt: Buffer.from(passwordSalt) });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
