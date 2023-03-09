const router = require("express").Router();
const { models: { User }} = require("../db");
// import { requireToken } from "./index";
module.exports = router;

//GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET a single user
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//PUT to update user
router.put("/:userId", async (req, res, next) => {
  // const authenticatedUserAdmin = req.user.dataValues.isAdmin;

  try {
    // if (authenticatedUserAdmin == true) {
    //   const found = await User.findByPk(req.params.userId);
    //   const edited = await found.update(req.body);
    //   res.status(200).json(edited);
    // }
    const found = await User.findByPk(req.params.userId);
      const edited = await found.update(req.body);
      res.status(200).json(edited);
  } catch (err) {
    next(err);
  }
});
