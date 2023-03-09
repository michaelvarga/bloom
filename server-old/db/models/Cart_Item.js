const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("cart_item", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  purchaseStatus: {
    type: Sequelize.ENUM("cart", "favorite", "later", "purchased"),
    defaultValue: "cart"
  },
  purchaseDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  purchasePrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
});
