const { createGzip } = require("node:zlib");
const { pipeline } = require("node:stream");
const { createReadStream, createWriteStream, statSync } = require("node:fs");
require("dotenv").config();

const videoDir = process.env.VIDEO_DIR;
const zipVideoDir = process.env.ZIP_VIDEO_DIR;

const gzip = createGzip();
const source = createReadStream(videoDir);
const destination = createWriteStream(zipVideoDir);

// Get the size of the original video file
const originalSize = statSync(videoDir).size;

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error("Error occurred while compressing video:", err);
    process.exitCode = 1;
  } else {
    const compressedSizeMb = (
      statSync(zipVideoDir).size /
      (1024 * 1024)
    ).toFixed(2);
    const originalSizeMb = (originalSize / (1024 * 1024)).toFixed(2);

    console.log(`Original size: ${originalSizeMb} mb`);
    console.log(`Compressed size: ${compressedSizeMb} mb`);
    console.log(`Video compressed successfully to ${zipVideoDir}`);
  }
});
