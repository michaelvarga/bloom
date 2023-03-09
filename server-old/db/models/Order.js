const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("order", {
  plantId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  plantPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATE,
  },
  total: {
    type: Sequelize.INTEGER,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
  },
});
