const CarBody = require("./car-body");
const Engine = require("./engine");

class Car {
  constructor() {
    this.carBody = new CarBody();
    this.engine = new Engine();
  }

  create() {
    this.carBody.install();
    this.engine.install();

    return this;
  }

  run() {
    if (!this.carBody || !this.engine) {
      throw new Error("Can't run car with non installed parts.");
    }

    this.engine.run();
    console.log("The car started, good luck!");
  }
}

module.exports = Car;
