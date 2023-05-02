const { Transform } = require("stream");
const fs = require("fs");
const { translate } = require("free-translate");
require("dotenv").config();

const verstDir = process.env.TEXT_DIR;
const enVerseDir = process.env.EN_TEXT_DIR;
const cnVerseDir = process.env.CN_TEXT_DIR;

const readTextStream = fs.createReadStream(verstDir);
const translateEnStream = fs.createWriteStream(enVerseDir);
const translateCnStream = fs.createWriteStream(cnVerseDir);

const translateStream = (language) =>
  new Transform({
    transform: async (chunk, encoding, callback) => {
      try {
        const translatedLine = await translate(chunk.toString(), {
          from: "ru",
          to: language,
        });
        callback(null, `${translatedLine}\n`);
      } catch (error) {
        callback(error);
      }
    },
  });

const handleError = (readStream, writeStream) => {
  return (error) => {
    readStream.destroy();
    writeStream.end("Finished with error...");

    console.log(`Error: ${error}`);
  };
};

const translateText = (readStream, writeStream, language) => {
  readStream
    .on("error", handleError(readTextStream, translateEnStream))
    .pipe(translateStream(language))
    .pipe(writeStream)
    .on("error", handleError(readTextStream, translateCnStream));
  console.log(`Text translated in ${language}`);
};

translateText(readTextStream, translateEnStream, "en");
translateText(readTextStream, translateCnStream, "zh-CN");

//another way

// const readAndTranslate = async (inputFile, outputFile, language) => {
//   const rl = readline.createInterface({
//     input: fs.createReadStream(inputFile),
//     crlfDelay: Infinity,
//   });

//   fs.truncateSync(outputFile, 0);

//   const writeStream = fs.createWriteStream(outputFile);

//   for await (const line of rl) {
//     if (line.trim() === "") {
//       writeStream.write("\n");
//     } else {
//       const translatedLine = await translate(line, {
//         from: "ru",
//         to: language,
//       });
//       writeStream.write(`${translatedLine}\n`);
//     }
//   }

//   writeStream.end();
//   console.log(`Translation complete in ${language}!`);
// };

// readAndTranslate(verstDir, enVerseDir, "en");
// readAndTranslate(verstDir, cnVerseDir, "zh-CN");
