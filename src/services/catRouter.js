const router = require("find-my-way")();
const catController = require("../controller/cat");
const { getNotFoundResponse } = require("../utils/getNotFoundResponse");
const { decrypt } = require("../services/json-encryption");

router.on("GET", "/cat", async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.writeHead(403);
    return res.end(JSON.stringify(getNotFoundResponse(res, 403, "Forbidden!")));
  } else {
    try {
      const tokenData = decrypt(authorization);
      console.log(tokenData);
    } catch (err) {
      res.writeHead(403);
      return res.end(
        JSON.stringify(getNotFoundResponse(res, 403, "Forbidden!"))
      );
    }
  }

  console.log("req.authorization", authorization);
  const result = await catController.getCats(res);
  res.end(JSON.stringify(result));
});

router.on("GET", "/cat/:catId", async (req, res, { catId }) => {
  const result = await catController.getCatById(res, catId);
  res.end(JSON.stringify(result));
});

router.on("POST", "/cat", async (req, res) => {
  const result = await catController.createCat(req);
  res.end(JSON.stringify(result));
});

router.on("PUT", "/cat/:catId", async (req, res, { catId }) => {
  const result = await catController.updateCatById(req, res, catId);
  res.end(JSON.stringify(result));
});

router.all("/cat/:catId/addOwner", async (req, res, { catId }) => {
  if (req.method === "PUT" || req.method === "POST") {
    const result = await catController.addOwner(req, res, catId);
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
});

router.on("DELETE", "/cat/:catId", async (req, res, { catId }) => {
  const result = await catController.deleteCatById(res, catId);
  res.end(JSON.stringify(result));
});

module.exports = router;
