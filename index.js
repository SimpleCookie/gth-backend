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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

// Skapa mockdata

const random = (max, min = 0) => Math.floor(Math.random() * max) + min + 1;
activities = [
  "printing",
  "Acrobatics",
  "Acting",
  "Amateur radio",
  "Animation",
  "Aquascaping",
  "Baking",
  "Baton twirling",
  "Board/tabletop games",
  "Book restoration",
  "Cabaret",
  "Brazilian jiu-jitsu",
  "Calligraphy",
  "Candle making",
  "Coffee roasting",
  "Collecting",
  "Coloring",
  "Computer programming",
  "Cooking"
];
setTimeout(() => {
  for (let i = 0; i < 10; i++) {
    User.create({});
  }
  for (let i = 0; i < 5; i++) {
    Activity.create({
      name: activities[random(activities.length - 1)],
      description: faker.lorem.paragraph(),
      attendees: random(9, 1),
      time: `${random(2)}${random(3)}:${random(5)}${random(9)}`,
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      userId: random(5)
    });
  }
}, 500);
