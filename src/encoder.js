const fs = require("fs");
require("dotenv").config();

const inputDir = process.env.TEXT_INPUT_DIR;
const outputDir = process.env.TEXT_OUTPUT_DIR;
const resultDir = process.env.TEXT_RESULT_DIR;

const encodeText = (inputDir, outputDir, resultDir, callback) => {
  fs.readFile(inputDir, (err, data) => {
    if (err) throw err;
    const encodedData = data.toString("hex");

    fs.writeFile(outputDir, encodedData, (err) => {
      if (err) throw err;
      console.log(`encodedData успешно записан в файл ${outputDir}`);
      callback(outputDir, resultDir);
    });
  });
};

const decodeText = (outputDir, resultDir) => {
  fs.readFile(outputDir, (err, data) => {
    if (err) throw err;

    const decodedData = Buffer.from(data.toString(), "hex").toString();
    fs.writeFile(resultDir, decodedData, (err) => {
      if (err) throw err;
      console.log(`decodedData успешно записан в файл ${resultDir}`);
    });
  });
};

encodeText(inputDir, outputDir, resultDir, decodeText);

// I read input/input.txt using readfile and get buffer <Buffer d0 91 d0 b5>. The data was like a string in utf-8,
// I decoded this buffer to a hexadecimal string and saved it in output/input.txt. This data looks like d091d0b5d0bbd...
// (this is a hexadecimal string).

// When I read output/input.txt, I got a buffer <Buffer 64 30 39 31 64> because the data was d091d0b5d0bbd.
// The buffer has a raw format. I decoded this buffer to a string like d091d0b5d0bbd... and created a new buffer.
// Buffer.from(data.toString(), "hex") and buffer look like <Buffer d0 91 d0 b5 d0>.this buffer fall within the range of
// the Unicode character set, they can be interpreted as UTF-8 encoded text characters.
// so I can decode this to words like "Белеет одиноко."
