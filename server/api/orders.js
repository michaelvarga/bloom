const router = require('express').Router()
const { models: { Order, User }} = require('../db')
module.exports = router

//POST orders
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//GET all orders
router.get("/", async (req, res, next) => {
  try {
    const order = await Order.findAll({
      include: [
        { model: User, attributes: ["id", "username", "isAdmin"] },
      ]
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//GET /orders/:orderId
router.get("/:orderId", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [
        { model: User, attributes: ["id", "username", "isAdmin"] },
      ]
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});


