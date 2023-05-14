const userModel = require("../model/user");
const catModel = require("../model/cat");
const { v4: uuid } = require("uuid");

const getNotFoundResponse = (res) => {
  res.writeHead(404);
  return {
    error: {
      message: "Not found",
      code: 404,
    },
  };
};

const parseJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let rawJson = "";
    request
      .on("data", (chunk) => {
        rawJson += chunk;
      })
      .on("end", () => {
        try {
          if (rawJson) {
            const requestBody = JSON.parse(rawJson);
            resolve(requestBody);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });

exports.getUsers = async () => {
  const users = await userModel.fetchAllUsers();

  if (!users.length) {
    return getNotFoundResponse(res);
  }

  return users;
};

exports.getUserById = async (res, userId) => {
  const user = await userModel.fetchUserById(userId);

  if (!user) {
    return getNotFoundResponse(res);
  }

  return user;
};

exports.createUser = async (req) => {
  const userData = await parseJsonBody(req);
  userData.id = uuid();

  await userModel.addNewUser(userData);

  return userData;
};

exports.updateUserById = async (req, res, userId) => {
  const updateData = await parseJsonBody(req);
  const user = await userModel.fetchUserById(userId);
  const updatedUser = { ...user, ...updateData };

  const updateResult = await userModel.update(updatedUser);

  if (!updateResult) {
    return getNotFoundResponse(res);
  }

  return updatedUser;
};

exports.deleteUserById = async (res, userId) => {
  const updateResult = await userModel.delete(userId);
  const cats = await catModel.fetchAllCats();

  if (!updateResult) {
    return getNotFoundResponse(res);
  }

  const modifiedCats = cats.map((cat) => {
    if (cat.ownerId === userId) {
      return { ...cat, ownerId: null };
    } else {
      return cat;
    }
  });

  catModel.deleteOwner(modifiedCats);

  return {
    id: userId,
  };
};
