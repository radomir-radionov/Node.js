exports.validateBodyCredentials = (res, body, status = 400) => {
  if (!body || !body.login || !body.password) {
    res.writeHead(400);
    return {
      error: {
        status: status,
        message: "Login and password required!",
      },
    };
  }
};
