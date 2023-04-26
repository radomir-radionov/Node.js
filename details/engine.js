const CarBody = require("./car-body");

class Engine {
  constructor() {
    this.carBody = new CarBody();
  }

  install() {
    this.carBody.welding();
  }

  run() {
    console.log("RRRR engine run!");
  }
}

module.exports = Engine;
