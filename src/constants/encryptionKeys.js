require("dotenv").config();

exports.encryptionKeys = {
  syncEncryptor: {
    keyword: process.env.SYNC_ENCRYPTOR_KEYWORD,
    salt: process.env.SYNC_ENCRYPTOR_SALT,
  },
  passwordSalt: process.env.PASSWORD_SALT,
};
