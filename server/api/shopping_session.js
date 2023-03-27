const router = require("express").Router();
const {
  models: { User, Shopping_Session, Plant, Cart_Item },
} = require("../db");
module.exports = router;

router.post("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // check if they have a shopping session
    const session = await Shopping_Session.findOne({
      where: { userId },
    });

    // if not, create a new shopping session
    if (!session) {
      const newSession = await Shopping_Session.create({userId});
      return res.status(201).json(newSession);
    }

    return res.status(201).json(session);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  const {userId} = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const session = await Shopping_Session.findOne({
      where: {
        userId: userId
      }
    });
    if(!session) {
      return res.status(404).json({error: "Session not found"})
    }

    res.json(session);
  } catch (err) {
    next(err)
  }
})
router.get("/", async (req, res, next) => {
  try {
    const session = await Shopping_Session.findAll();
    if(!session) {
      return res.status(404).json({error: "Session not found"})
    }
    res.json(session);
  } catch (err) {
    next(err)
  }
});


