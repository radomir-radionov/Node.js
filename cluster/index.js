const cluster = require("cluster");

if (cluster.isPrimary) {
  require("./master");
} else {
  require("./worker");
}
