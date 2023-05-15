const userModel = require("../model/user");
const catModel = require("../model/cat");
const { v4: uuid } = require("uuid");
const { getNotFoundResponse } = require("../utils/getNotFoundResponse");
const { parseJsonBody } = require("../utils/parseJsonBody");
const { validateBodyCredentials } = require("../utils/validateBodyCredentials");
const { createPasswordHash } = require("../utils/encription");

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

exports.createUser = async (req, res) => {
  const newUserData = await parseJsonBody(req);

  validateBodyCredentials(res, newUserData);

  console.log(1, newUserData.password);
  newUserData.password = await createPasswordHash(newUserData.password);
  console.log(2, newUserData.password);

  newUserData.id = uuid();
  const createResult = await userModel.createNewUser(newUserData);

  if (!createResult) {
    res.writeHead(409);
    return {
      error: {
        status: 409,
        message: "User already exists!",
      },
    };
  }

  return newUserData;
};

exports.loginUser = async (req, res) => {
  const newUserBody = await parseJsonBody(req);

  validateBodyCredentials(res, newUserBody);

  return;
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
  // TODO add return value for catModel.deleteOwner();
  catModel.deleteOwner(userId);
  const updateResult = await userModel.delete(userId);

  if (!updateResult) {
    return getNotFoundResponse(res);
  }

  return {
    id: userId,
  };
};
