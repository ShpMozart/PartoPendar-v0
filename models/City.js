const Sequelize = require("sequelize");
const db = require("../db/database");

const City = db.define("city", {
  city: {
    type: Sequelize.STRING,
  },
});

module.exports = City;
