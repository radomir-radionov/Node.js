// console.log("hello from child", process.argv);
const http = require("http");

const PORT = +process.argv[2];

const server = http.createServer((req, res) => {
  res.write("This is a home page");
  res.end();
});

server.listen(PORT);
