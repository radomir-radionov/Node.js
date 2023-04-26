const Engine = require("./details/engine");
const CarBody = require("./details/car-body");
const Car = require("./details/car");

const carBody = new CarBody(new Engine());
const engine = new Engine(carBody);
const car = new Car(carBody, engine);

car.create().run();
