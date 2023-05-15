exports.parseJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let rawJson = "";
    request
      .on("data", (chunk) => {
        rawJson += chunk;
      })
      .on("end", () => {
        try {
          if (rawJson) {
            const requestBody = JSON.parse(rawJson);
            resolve(requestBody);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });
