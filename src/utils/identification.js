const { getNotFoundResponse } = require("./getNotFoundResponse");
const { decrypt } = require("../services/json-encryption");

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
