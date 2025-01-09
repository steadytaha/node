var express = require("express");
var router = express.Router();
const fs = require("fs");

let routes = fs.readdirSync(__dirname).filter((file) => file !== "index.js");

for (let route of routes) {
  route = route.split(".")[0];
  router.use("/" + route, require("../routes/" + route));
}
module.exports = router;
