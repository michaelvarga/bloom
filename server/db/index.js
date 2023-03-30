const db = require("./db");
const User = require("./models/User");
const Order = require("./models/Order");
const Plant = require("./models/Plant");
const Cart_Item = require("./models/Cart_Item");
const Shopping_Session = require("./models/Shopping_Session");
const Plant_Detail = require("./models/Plant_Details");

/*
3 types of data
  Static Data
    --plants
    --users
    --discounts

  Session Data
    --shopping_session
    --cart_item

  Processed Data
    --orders
    --order_details
    --payments
*/


Order.belongsToMany(Plant, { through: "Order_Details" });
Plant.belongsToMany(Order, { through: "Order_Details" });

Plant.hasOne(Plant_Detail);
Plant_Detail.belongsTo(Plant);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Cart_Item);
Cart_Item.belongsTo(Order);

// one-to-many between plant and cart_item
Plant.hasMany(Cart_Item);
Cart_Item.belongsTo(Plant);

Cart_Item.belongsTo(User);
User.hasMany(Cart_Item);

// one-to-one between user, shopping_session
User.hasOne(Shopping_Session);
Shopping_Session.belongsTo(User);

// one-to-many between shopping_session, cart_items
Shopping_Session.hasMany(Cart_Item);
Cart_Item.belongsTo(Shopping_Session);

module.exports = {
  db,
  models: {
    User,
    Order,
    Plant,
    Cart_Item,
    Shopping_Session,
    Plant_Detail
  },
};
