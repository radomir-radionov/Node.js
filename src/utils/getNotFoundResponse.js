exports.getNotFoundResponse = (res, code = 404, message = "Not found!") => {
  res.writeHead(code);
  return {
    error: {
      message: message,
      code: code,
    },
  };
};
