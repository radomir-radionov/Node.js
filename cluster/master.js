const cluster = require("cluster");

const resolutions = [
  { width: 240, height: 480 },
  { width: 600, height: 800 },
  { width: 1024, height: 768 },
  { width: 1200, height: 960 },
  { width: 1200, height: 1200 },
];

for (let i = 0; i < resolutions.length; ++i) {
  cluster.fork();
}

const workers = Object.values(cluster.workers);

process.stdin.on("data", (buff) => {
  const [command, filename] = buff.toString().trim().split(" ");

  if (command === "exit") {
    console.log("Buy!");
    process.exit();
  } else if (command === "upload") {
    workers.forEach((worker, index) => {
      worker.send({
        filename,
        width: resolutions[index].width,
        height: resolutions[index].height,
      });

      worker.once("message", (msg) => console.log(msg));
    });
  } else {
    console.log("I have no idea what you mean.");
  }
});
