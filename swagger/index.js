const users = require("./users.json");
const activities = require("./activities.json");

const base = {
  swagger: "2.0",
  info: {
    title: "Spome",
    description: "Spome that!",
    version: "1.0"
  },
  produces: ["application/json"],
  host: "localhost:3007",
  basePath: "/api/",
  paths: {}
};

base.paths["/users"] = users;
base.paths["/activities"] = activities;
module.exports = base;
