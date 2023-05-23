const { execFile } = require("child_process");

const controller = new AbortController();
const { signal } = controller;
execFile("node", ["--version"], { signal }, (error, stdout) => {
  console.log(error);
  console.log(stdout);
});

controller.abort();
