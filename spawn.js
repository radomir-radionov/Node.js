const colors = require("colors");
const path = require("path");

const ls = spawn("ls", ["-la", path.resolve(__dirname)]);

ls.stdout.on("data", (data) => {
  const arrayOfLines = data.toString().split("\n");
  arrayOfLines.forEach((line, i) => {
    console.log(i, colors.random(line));
  });
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
