const { createReadStream, writeFile } = require("fs");
const path = require("path");

const dbJsonPath = path.resolve(process.cwd(), "src/services/userDB.json");

const readJSONAsync = (path) =>
  new Promise((resolve) => {
    const readStream = createReadStream(path);
    let result = "";
    readStream
      .on("data", (chunk) => {
        result += chunk.toString();
      })
      .on("end", () => {
        if (!result) {
          resolve([]);
        } else {
          resolve(JSON.parse(result));
        }
      });
  });

const writeJSONAsync = (path, data) => {
  const buffer = Buffer.from(JSON.stringify(data, null, 4));
  new Promise((resolve, reject) => {
    writeFile(path, buffer, (err) => {
      err ? reject(err) : resolve();
    });
  });
};

exports.fetchAllUsers = () => readJSONAsync(dbJsonPath);

exports.fetchUserById = async (id) => {
  const users = await readJSONAsync(dbJsonPath);

  return users.find((user) => user.id === id);
};

exports.addNewUser = async (data) => {
  const users = await readJSONAsync(dbJsonPath);

  users.push(data);

  await writeJSONAsync(dbJsonPath, users);
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
