const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const ActivityModel = require("./models/activity");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: "database.sqlite"
});

const Activity = ActivityModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
Activity.belongsTo(User);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Activity
};
