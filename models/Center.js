const Sequelize = require("sequelize");
const db = require("../db/database");

const Center = db.define("center", {
  cityId: {
    type: Sequelize.INTEGER,
  },
  center: {
    type: Sequelize.STRING,
  },
});

module.exports = Center;
