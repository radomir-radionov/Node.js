const Engine = require("./engine");

class CarBody {
  parts = [];

  constructor() {
    this.engine = new Engine();
  }

  install() {
    this.engine.install();
    this.parts.push(this.engine);
  }

  welding() {
    this.parts.forEach((part) => {
      console.log(`Welding car part: ${part.constructor.name}`);
    });
  }
}

module.exports = CarBody;
