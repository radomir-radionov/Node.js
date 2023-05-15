exports.parseJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let rawJson = "";
    req
      .on("data", (chunk) => {
        rawJson += chunk;
      })
      .on("end", () => {
        try {
          if (rawJson) {
            const reqBody = JSON.parse(rawJson);
            resolve(reqBody);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });
