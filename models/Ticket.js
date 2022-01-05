const Sequelize = require("sequelize");
const db = require("../db/database");

const Ticket = db.define("ticket", {
  senderId: {
    type: Sequelize.INTEGER,
  },
  workerId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  senderName: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  center: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
  fileId: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM(["pending", "proccessing", "done"]),
    defaultValue: "pending",
  },
});
module.exports = Ticket;
