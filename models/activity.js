module.exports = (sequelize, type) => {
  return sequelize.define("activity", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    attendees: type.INTEGER,
    difficulty: type.INTEGER,
    description: type.STRING,
    time: type.STRING,
    longitude: type.INTEGER,
    latitude: type.INTEGER
  });
};
