const fs = require("fs");

module.exports = class Cat {
  constructor() {
    this.cats = [];
  }

  static async getCats() {
    return new Promise((resolve, reject) => {
      fs.readFile("data.json", (err, data) => {
        if (err) {
          reject(err);
        } else {
          this.cats = JSON.parse(data.toString());
          resolve(this.cats);
        }
      });
    });
  }
};
