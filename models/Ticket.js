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
  file: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM(["pending", "proccessing", "done"]),
    defaultValue: "pending",
  },
});
/*
createdAt: {
      type: Sequelize.D,
      defaultValue: new Date().toString(),
    },
    updatedAt: {
      type: Sequelize.STRING,
      defaultValue: new Date().toString(),
    },
  },
  {
    timestamps: false,
  }
*/
module.exports = Ticket;
