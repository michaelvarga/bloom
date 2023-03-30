const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("plant_detail", {
  size: {
    type: Sequelize.ENUM('xs', 'sm', 'md', 'lg', 'xl'),
    allowNull: false
  },
  light: {
    type: Sequelize.ENUM('indirect', 'direct'),
    allowNull: false
  },
  pet_friendly: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  air_cleaner: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  full_description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  botanical_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  common_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
});
