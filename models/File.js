const Sequelize = require("sequelize");
const db = require("../db/database");

const File = db.define("file", {
  ticketId: {
    type: Sequelize.INTEGER,
  },
  senderId: {
    type: Sequelize.INTEGER,
  },
  from: {
    type: Sequelize.STRING,
  },
  fileAddress: {
    type: Sequelize.STRING,
  },
});

module.exports = File;
