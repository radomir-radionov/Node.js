const userModel = require("../model/user");
const catModel = require("../model/cat");
const { v4: uuid } = require("uuid");
const { getNotFoundResponse } = require("../utils/getNotFoundResponse");
const { parseJsonBody } = require("../utils/parseJsonBody");

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

exports.getCats = async (req, res) => {
  console.log(req.user);
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

exports.addOwner = async (req, res, catId) => {
  const bodyData = await parseJsonBody(req);
  const user = await userModel.fetchUserById(bodyData.id);
  const cat = await catModel.fetchCatById(catId);

  if (!user || !cat) {
    console.log(1);
    return getNotFoundResponse(res);
  }

  cat.ownerId = user.id;
  const updatedCat = { ...cat };

  if (user.pets?.length) {
    const isExsitedPet = user.pets.some((pet) => pet.id === catId);

    if (isExsitedPet) {
      //TODO add another error
      return getNotFoundResponse(res);
    }

    user.pets.push(updatedCat);
  } else {
    user.pets = [];
    user.pets.push(updatedCat);
  }

  const updateCatResult = await catModel.update(updatedCat);
  const updateUserResult = await userModel.update(user);
  if (!updateCatResult || !updateUserResult) {
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
