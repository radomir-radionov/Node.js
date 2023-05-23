const { fork } = require("node:child_process");
const { resolve } = require("path");

const ports = [3000, 3001, 3002, 3003];

ports.forEach((port) => {
  const child = fork(resolve(__dirname, "child.js"), [port]);
  child.on("exit", (code) => {
    console.log("child exit with code;", code);
  });
});
