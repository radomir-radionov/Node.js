const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.write("This is a home page");
  res.end();
});

server.listen(PORT);
