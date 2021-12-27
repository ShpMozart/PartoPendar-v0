const Sequelize = require("sequelize");

// configure this with your own parameters
const database = new Sequelize({
  database: "partopendar",
  username: "root",
  password: "",
  dialect: "mysql",
  timestamps: false, // I do not want timestamp fields by default
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) {
      // for reading from database
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "+03:30",
});
module.exports = database;
