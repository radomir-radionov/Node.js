const { getNotFoundResponse } = require("../utils/getNotFoundResponse");
const { decrypt } = require("./json-encryption");
const { HttpError } = require("../utils/customError");

exports.checkAuth = (req) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log(1);
    throw new HttpError("Forbidden", 403);
  }

  try {
    req.user = decrypt(authorization);
  } catch (err) {
    throw new HttpError("Forbidden", 403);
  }
};

exports.identification =
  (cb) =>
  (...args) => {
    const [req, res] = args;
    const { authorization } = req.headers;

    if (!authorization) {
      res.writeHead(403);
      return res.end(
        JSON.stringify(getNotFoundResponse(res, 403, "Forbidden!"))
      );
    } else {
      try {
        req.user = decrypt(authorization);
      } catch (err) {
        res.writeHead(403);
        return res.end(
          JSON.stringify(getNotFoundResponse(res, 403, "Forbidden!"))
        );
      }
    }

    return cb(...args);
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
