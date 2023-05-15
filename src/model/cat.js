const path = require("path");
const { readJSONAsync } = require("../utils/readJSONAsync");
const { writeJSONAsync } = require("../utils/writeJSONAsync");

const dbJsonPath = path.resolve(process.cwd(), "src/services/catDB.json");

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

exports.deleteOwner = async (userId) => {
  const cats = await exports.fetchAllCats();

  const modifiedCats = cats.map((cat) => {
    if (cat.ownerId === userId) {
      return { ...cat, ownerId: null };
    } else {
      return cat;
    }
  });

  await writeJSONAsync(dbJsonPath, modifiedCats);
};
