const router = require("find-my-way")();
const userController = require("../controller/user");

router.on("GET", "/user", async (req, res) => {
  const result = await userController.getUsers();

  res.end(JSON.stringify(result));
});

router.on("GET", "/user/:userId", async (req, res, { userId }) => {
  const result = await userController.getUserById(res, userId);

  res.end(JSON.stringify(result));
});

router.on("POST", "/user", async (req, res) => {
  const result = await userController.createUser(req);

  res.end(JSON.stringify(result));
});

router.on("PUT", "/user/:userId", async (req, res, { userId }) => {
  const result = await userController.updateUserById(req, res, userId);

  res.end(JSON.stringify(result));
});

router.on("DELETE", "/user/:userId", async (req, res, { userId }) => {
  const result = await userController.deleteUserById(res, userId);

  res.end(JSON.stringify(result));
});

module.exports = router;
