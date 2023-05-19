const userModel = require("../model/user");
const catModel = require("../model/cat");
const { v4: uuid } = require("uuid");
const { getNotFoundResponse } = require("../utils/getNotFoundResponse");
const { parseJsonBody } = require("../utils/parseJsonBody");
const { validateBodyCredentials } = require("../utils/validateBodyCredentials");
const { createPasswordHash } = require("../utils/encription");
const jwt = require("../services/jwt");

exports.getUsers = async (res) => {
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

exports.findUserByLogin = async (res, userLogin) => {
  const user = await userModel.findUserByLogin(userLogin);

  if (!user) {
    return getNotFoundResponse(res);
  }

  return user;
};

exports.createUser = async (req, res) => {
  const { password, ...newUserData } = await parseJsonBody(req);

  validateBodyCredentials(res, { ...newUserData, password });

  const passwordHash = await createPasswordHash(password);

  const user = {
    id: uuid(),
    ...newUserData,
  };

  const createdUser = await userModel.createNewUser({
    ...user,
    password: passwordHash,
  });

  if (!createdUser) {
    res.writeHead(409);
    return {
      error: {
        status: 409,
        message: "User already exists!",
      },
    };
  }

  return user;
};

exports.loginUser = async (req, res) => {
  const newUserBody = await parseJsonBody(req);
  validateBodyCredentials(res, newUserBody);

  const foundUser = await exports.findUserByLogin(res, newUserBody.login);
  const currentHash = await createPasswordHash(newUserBody.password);

  if (foundUser.password !== currentHash) {
    return getNotFoundResponse(res, 401, "Unauthorized!");
  }

  console.log(foundUser);

  return {
    token: jwt.sign({
      sub: foundUser.id,
      roles: foundUser.roles,
    }),
  };
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

exports.addUserRole = async (req, res) => {
  const { userId, roles } = await parseJsonBody(req);

  const foundUser = await userModel.fetchUserById(userId);
  const isSubset = foundUser.roles.some((role) => roles.includes(role));

  if (isSubset) {
    return getNotFoundResponse(res, 400, "Data is repeated");
  }

  foundUser.roles = foundUser.roles.concat(roles);
  const updatedUser = await userModel.update(foundUser);

  if (!updatedUser) {
    return getNotFoundResponse(res);
  }

  return updatedUser;
};
