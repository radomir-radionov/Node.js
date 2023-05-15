const path = require("path");
const { readJSONAsync } = require("../utils/readJSONAsync");
const { writeJSONAsync } = require("../utils/writeJSONAsync");

const dbJsonPath = path.resolve(process.cwd(), "src/services/userDB.json");

exports.fetchAllUsers = () => readJSONAsync(dbJsonPath);

exports.fetchUserById = async (id) => {
  const users = await readJSONAsync(dbJsonPath);

  return users.find((user) => user.id === id);
};

exports.createNewUser = async (user) => {
  const users = await readJSONAsync(dbJsonPath);

  const existedUser = users.find(
    (existedUser) => existedUser.login === user.login
  );

  if (existedUser) {
    return false;
  }

  users.push(user);

  await writeJSONAsync(dbJsonPath, users);
  return true;
};

exports.update = async (data) => {
  const users = await readJSONAsync(dbJsonPath);
  const foundUserIndex = users.findIndex((user) => user.id === data.id);

  if (foundUserIndex === -1) {
    return false;
  }

  users[foundUserIndex] = data;

  await writeJSONAsync(dbJsonPath, users);

  return true;
};

exports.delete = async (id) => {
  const users = await readJSONAsync(dbJsonPath);
  let isUserWasFound = false;

  const filtredUsers = users.filter((user) => {
    if (user.id !== id) {
      return true;
    }

    isUserWasFound = true;

    return false;
  });

  if (isUserWasFound) {
    await writeJSONAsync(dbJsonPath, filtredUsers);

    return true;
  }

  return false;
};
