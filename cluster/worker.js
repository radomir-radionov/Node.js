const sharp = require("sharp");
const path = require("path");

process.on("message", ({ filename, width, height }) => {
  const inputPath = path.resolve(__dirname, "input", filename);
  const outputPath = path.resolve(
    __dirname,
    "uploads",
    `${width}x${height}_${filename}`
  );
  return sharp(inputPath)
    .resize(width, height)
    .toFile(outputPath, (error) => {
      if (error) {
        process.send({ error: error.message });
      } else {
        process.send({ path: outputPath });
      }
    });
});
