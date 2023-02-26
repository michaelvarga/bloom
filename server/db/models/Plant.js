const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("plant", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  location: {
    type: Sequelize.STRING,
    defaultValue: "Outdoor",
    validate: {
      isIn: [["Outdoor", "Indoor"]],
    },
  },
  care: {
    type: Sequelize.STRING,
    defaultValue: "Moderate",
    validate: {
      isIn: [["Moderate", "Easy", "No-Fuss"]],
    },
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.iconpacks.net/icons/2/free-plant-icon-1573-thumb.png",
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});
