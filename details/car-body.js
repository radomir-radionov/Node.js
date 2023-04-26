class CarBody {
  parts = [];

  constructor(engine) {
    this.engine = engine;
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
