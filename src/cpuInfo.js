const os = require("os");
const fs = require("fs");

const userName = os.userInfo().username;
const cpuCores = os.cpus().length;
const freeMemory = os.freemem() / 1024 / 1024;
const cpuFrequency = os.cpus()[0].speed / 1000;
const osVersion = os.version();
const osType = os.type();

const osInfo = `
  Операционная система: ${osType} ${osVersion}\n
  Пользователь: ${userName}\nКоличество ядер: ${cpuCores}\n
  Свободная оперативная память: ${freeMemory} МБ\n
  Частота ядер: ${cpuFrequency} ГГц\n`;

fs.writeFile("osInfo.txt", osInfo, (err) => {
  if (err) throw err;
  console.log("Информация записана в файл osInfo.txt");
});
