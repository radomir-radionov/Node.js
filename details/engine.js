class Engine {
  constructor(carBody) {
    this.carBody = carBody;
  }

  install() {
    this.carBody?.welding();
  }

  run() {
    console.log("RRRR engine run!");
  }
}

module.exports = Engine;
