const { fork } = require("child_process");
const http = require("http");
const { resolve } = require("path");

const ports = [3000, 3001, 3002, 3003];

const children = ports.map((port) =>
  fork(resolve(__dirname, "worker.js"), [port])
);
const server = http.createServer((req, res) => {
  const child = children[Math.floor(Math.random() * children.length)];
  child.send({ command: "getTemplate", payload: { name: "Valera" } });
  child.send("getTemplate");
  child.once("message", (tempalte) => {
    console.log(child.pid);
    console.log(tempalte);
    res.setHeader("X-Child-Pid", child.pid);
    res.write(tempalte);
    res.end();
  });
});

server.listen(3000);
