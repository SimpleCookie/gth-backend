const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const faker = require("faker");
const { User, Activity } = require("./sequelize");

const app = express();
app.use(bodyParser.json());
app.use(logger("dev"));

const port = 3007;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}!`);
});

app.get("/api/users", (req, res) =>
  User.findAll().then(users => res.json(users))
);
app.post("/api/users", (req, res) =>
  User.create(req.body).then(user => res.json(user))
);

app.get("/api/activities", (req, res) =>
  Activity.findAll().then(activities => res.json(activities))
);
app.post("/api/activities", (req, res) => {
  const newActivity = { ...req.body, userId: req.get("user") };
  Activity.create(newActivity).then(activity => res.json(activity));
});

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

setTimeout(() => {
  for (let i = 0; i < 5; i++) {
    User.create({});
    Activity.create({ name: faker.userName, userID: i });
  }
}, 500);
