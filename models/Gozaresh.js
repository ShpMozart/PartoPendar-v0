const Sequelize = require("sequelize");
const db = require("../db/database");

const Gozaresh = db.define("gozaresh", {
  userId: {
    type: Sequelize.INTEGER,
  },
  senderName: {
    type: Sequelize.STRING,
  },
  month: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  tozihat: {
    type: Sequelize.STRING,
  },
});

module.exports = Gozaresh;

/*  date2: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day2: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date3: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day3: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date4: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day4: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date5: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day5: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date6: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day6: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date7: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day7: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date8: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day8: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date9: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day9: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date10: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day10: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date11: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day11: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date12: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day12: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date13: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day13: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date14: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day14: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date15: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day15: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date16: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day16: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date17: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day17: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date18: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day18: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date19: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day19: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date20: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day21: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date22: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day22: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date23: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day23: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date24: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day25: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date26: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day26: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date27: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day27: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date28: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day28: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date29: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day29: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date30: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day30: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date31: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day31: {
    type: Sequelize.STRING,
    allowNull: true,
  },*/
