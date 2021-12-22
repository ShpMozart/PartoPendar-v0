const Sequelize = require("sequelize");

// configure this with your own parameters
const database = new Sequelize({
  database: "partopendar",
  username: "root",
  password: "",
  dialect: "mysql",
});
module.exports = database;
