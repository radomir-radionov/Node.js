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

const createCahe = () => {
  let cache = {};

  setInterval(() => {
    cache = {};
  }, 5000);

  return async (key, cb, res) => {
    if (cache[key]) {
      res.setHeader("X-Cached-Key", key);
      return cache[key];
    }
    const data = await cb(key);
    cache[key] = data;

    return data;
  };
};

const cache = createCahe();

exports.getCats = async () => {
  const cats = await catModel.fetchAllCats();

  if (!cats.length) {
    return getNotFoundResponse(res);
  }

  return cats;
};

exports.getCatById = async (res, catId) => {
  const cat = await cache(catId, catModel.fetchCatById, res);

  if (!cat) {
    return getNotFoundResponse(res);
  }

  return cat;
};

exports.createCat = async (req) => {
  const catData = await parseJsonBody(req);
  catData.id = uuid();

  await catModel.addNewCat(catData);

  return catData;
};

exports.updateCatById = async (req, res, catId) => {
  const updateData = await parseJsonBody(req);
  const cat = await catModel.fetchCatById(catId);
  const updatedCat = { ...cat, ...updateData };

  const updateResult = await catModel.update(updatedCat);

  if (!updateResult) {
    return getNotFoundResponse(res);
  }

  return updatedCat;
};

exports.deleteCatById = async (res, catId) => {
  const updateResult = await catModel.delete(catId);

  if (!updateResult) {
    return getNotFoundResponse(res);
  }

  return {
    id: catId,
  };
};
