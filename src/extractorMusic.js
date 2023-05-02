const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const videoId = process.env.VIDEO_ID;
const extractedMusicDir = process.env.EXTRACTED_MUSIC_DIR;

const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
const outputDir = extractedMusicDir;

ytdl
  .getInfo(videoUrl)
  .then((info) => {
    const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
    const format = ytdl.chooseFormat(audioFormats, { quality: "highestaudio" });

    const readStream = ytdl(videoUrl, { format });
    const writeStream = fs.createWriteStream(
      path.join(outputDir, `${info.videoDetails.title}.mp3`)
    );

    readStream
      .on("data", (chunk) => {
        console.log(`Received ${chunk.length} bytes of data.`);
      })
      .pipe(writeStream)
      .on("end", () => {
        console.log("Download finished.");
      });
  })
  .catch((error) => {
    console.log(error);
  });
