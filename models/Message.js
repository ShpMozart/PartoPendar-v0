const Sequelize = require("sequelize");
const db = require("../db/database");

const Message = db.define("message", {
  senderId: {
    type: Sequelize.INTEGER,
  },
  recieverId: {
    type: Sequelize.INTEGER,
  },
  text: {
    type: Sequelize.STRING,
  },
});

module.exports = Message;
