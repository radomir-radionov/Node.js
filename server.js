const http = require("http");
const catController = require("./controllers/catController.js");

const port = 3000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const urlParts = url.pathname.split("/");
  const id = urlParts[2];

  switch (true) {
    case url.pathname === "/cat":
      if (req.method === "GET") {
        catController.getCats(req, res);
      } else if (req.method === "POST") {
        catController.addCat(req, res);
      } else {
        catController.methodError(req, res);
      }
      break;
    case urlParts[1] === "cat" && urlParts.length === 3:
      if (req.method === "DELETE") {
        catController.deleteCat(req, res, id);
      } else if (req.method === "PUT") {
        catController.updateCat(req, res, id);
      } else {
        catController.methodError(req, res);
      }
      break;
    default:
      catController.unexpectedError(req, res);
      break;
  }
});

server.listen(port, host, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is running on http://${host}:${port}`);
});
