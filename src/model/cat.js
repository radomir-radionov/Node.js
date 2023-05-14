const { createReadStream, writeFile } = require("fs");
const path = require("path");

const dbJsonPath = path.resolve(process.cwd(), "src/services/catDB.json");

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

exports.fetchAllCats = () => readJSONAsync(dbJsonPath);

exports.fetchCatById = async (id) => {
  const cats = await readJSONAsync(dbJsonPath);

  return cats.find((cat) => cat.id === id);
};

exports.addNewCat = async (data) => {
  const cats = await readJSONAsync(dbJsonPath);

  cats.push(data);

  await writeJSONAsync(dbJsonPath, cats);
};

exports.update = async (data) => {
  const cats = await readJSONAsync(dbJsonPath);
  const foundCatIndex = cats.findIndex((cat) => cat.id === data.id);

  if (foundCatIndex === -1) {
    return false;
  }

  cats[foundCatIndex] = data;

  await writeJSONAsync(dbJsonPath, cats);

  return true;
};

exports.delete = async (id) => {
  const cats = await readJSONAsync(dbJsonPath);
  let isCatWasFound = false;

  const filtredCats = cats.filter((cat) => {
    if (cat.id !== id) {
      return true;
    }

    isCatWasFound = true;

    return false;
  });

  if (isCatWasFound) {
    await writeJSONAsync(dbJsonPath, filtredCats);

    return true;
  }

  return false;
};

exports.deleteOwner = async (data) => {
  await writeJSONAsync(dbJsonPath, data);
};
