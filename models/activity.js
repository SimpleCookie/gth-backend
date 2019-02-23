module.exports = (sequelize, type) => {
  return sequelize.define("activity", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING
  });
};
