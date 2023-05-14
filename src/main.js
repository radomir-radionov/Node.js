const { createServer } = require("http");
const catRouter = require("./services/catRouter");
const userRouter = require("./services/userRouter");

const port = 3000;
const host = "127.0.0.1";

const server = createServer((req, res) => {
  if (req.url.startsWith("/cat")) {
    catRouter.lookup(req, res);
  } else if (req.url.startsWith("/user")) {
    userRouter.lookup(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(port, host, (err) => {
  if (err) {
    console.log(err);
  }
});
