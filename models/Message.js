const Sequelize = require("sequelize");
const db = require("../db/database");

const Message = db.define("message", {
  ticketId: {
    type: Sequelize.INTEGER,
  },
  from: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  factor: {
    allowNull: true,
    type: Sequelize.JSON,
  },
});

module.exports = Message;
