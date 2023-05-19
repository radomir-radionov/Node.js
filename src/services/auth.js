const { HttpError } = require("../utils/customError");
const jwt = require("../services/jwt");

exports.checkAuth = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpError("Unauthorized", 401);
  }
  try {
    const [_, token] = authorization.split(" ");
    req.user = jwt.verify(token);
  } catch (err) {
    throw new HttpError("Unauthorized", 401);
  }
};

exports.checkRole =
  (...requiredRoles) =>
  (req) => {
    const currentUserRoles = req.user.roles || [];
    if (!requiredRoles.some((role) => currentUserRoles.includes(role))) {
      throw new HttpError(
        `Forbidden. Some of ${requiredRoles.join(",")} is required.`,
        403
      );
    }
  };
