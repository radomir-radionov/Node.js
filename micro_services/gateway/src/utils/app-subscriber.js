const EventEmitter = require("events")

class AppSubcriber extends EventEmitter {}

module.exports = new AppSubcriber()
