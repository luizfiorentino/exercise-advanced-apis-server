const User = require("../models").user;
const { Router } = require("express");
const bcrypt = require("bcrypt");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).send("Name, email and password must be provided");
    } else {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      //const newUser = await User.create(req.body);
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
