const Sequelize = require("sequelize");
const db = require("../config/database");

const Message = db.define(
  "message",
  {
    senderId: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Message;
