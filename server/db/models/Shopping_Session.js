const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('shopping_session', {
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
  email: {
    type: Sequelize.STRING,
  }
});
