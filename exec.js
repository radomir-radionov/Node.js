const { exec } = require("child_process");
const { stdout, stderr } = require("process");

exec('type lorem.txt | findstr  "hello"', (err, stdout, stderr) => {
  if (err) {
    throw err;
  } else if (stderr) {
    console.log(stderr);
  } else {
    console.log(stdout);
  }
});

// exec("python hello.py", (err, stdout, stderr) => {
//   if (err) {
//     throw err;
//   } else if (stderr) {
//     console.log(stderr);
//   } else {
//     console.log(stdout);
//   }
// });

//'type lorem.txt | findstr  "hello"' - arg for exec
// node exec.js | findstr  "buffer" will execute after  type lorem.txt | findstr  "hello"
