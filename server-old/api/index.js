const router = require("express").Router();
// const { models: { User }} = require("../db");
module.exports = router;

// export async function requireToken(req, res, next) {
//   try {
//     const token = req.headers.authorization;
//     const user = await User.findByToken(token);
//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

// router.use("/users", require("./users"));

router.use("/plants", require("./plants"));

// router.use("/orders", require("./orders"));


router.use('/cart_items', require('./cart_items'))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
