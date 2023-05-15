const { writeFile } = require("fs");

exports.writeJSONAsync = (path, data) => {
  const buffer = Buffer.from(JSON.stringify(data, null, 4));
  new Promise((resolve, reject) => {
    writeFile(path, buffer, (err) => {
      err ? reject(err) : resolve();
    });
  });
};
