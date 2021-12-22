const Sequelize = require("sequelize");
const db = require("../db/database");

// creation of the User model
const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: "default.jpg",
  },
  role: {
    type: Sequelize.ENUM(["admin", "boss", "client", "worker"]),
    allowNull: false,
  },
  passwordChanged: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
});

module.exports = User;
