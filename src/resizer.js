const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
require("dotenv").config();

const size = process.env.IMAGE_SIZE;
const inputDir = process.env.IMAGE_INPUT_DIR;
const outputDir = process.env.IMAGE_OUTPUT_DIR;

const resizeImages = () => {
  // разбиваем размер на ширину и высоту
  const [width, height] = size.split("x");

  // очищаем выходную директорию от существующих файлов
  fs.rmdirSync(outputDir, { recursive: true });
  fs.mkdirSync(outputDir);

  // читаем все файлы из директории
  fs.readdir(inputDir, (err, files) => {
    if (err) throw err;

    // фильтруем только картинки
    const images = files.filter((file) => /\.(jpg|png)$/i.test(file));

    // ресайзим картинки и сохраняем в выходную директорию
    images.forEach((image) => {
      const inputPath = path.join(inputDir, image);
      const outputPath = path.join(outputDir, image);

      sharp(inputPath)
        .resize(+width, +height)
        .toFile(outputPath, (err) => {
          if (err) throw err;

          console.log(`Resized ${inputPath} to ${outputPath}`);
        });
    });
  });
};

resizeImages();
