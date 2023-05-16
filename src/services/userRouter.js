const router = require("find-my-way")();
const userController = require("../controller/user");
const { identification, checkAuth, checkRole } = require("./auth");
const { routerMiddleware } = require("../utils/middleware");

const getUsersCb = async (req, res) => {
  const result = await userController.getUsers(res);
  res.end(JSON.stringify(result));
};

router.on(
  "GET",
  "/user",
  routerMiddleware([checkAuth, checkRole("SUPERADMIN", "ADMIN"), getUsersCb])
);

router.on("GET", "/user/:userId", async (req, res, { userId }) => {
  const result = await userController.getUserById(res, userId);
  res.end(JSON.stringify(result));
});

router.on("POST", "/user", async (req, res) => {
  const result = await userController.createUser(req, res);
  res.end(JSON.stringify(result));
});

//auth(login)

router.on("POST", "/user/login", async (req, res) => {
  const result = await userController.loginUser(req, res);
  res.end(JSON.stringify(result));
});

router.on("PUT", "/user/:userId", async (req, res, { userId }) => {
  const result = await userController.updateUserById(req, res, userId);
  res.end(JSON.stringify(result));
});

router.on(
  "DELETE",
  "/user/:userId",
  identification(async (req, res, { userId }) => {
    const result = await userController.deleteUserById(res, userId);
    res.end(JSON.stringify(result));
  })
);

module.exports = router;
