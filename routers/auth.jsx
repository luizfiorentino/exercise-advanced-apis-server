const { Router } = require("express");

const { toJWT, toData } = require("../auth/jwt.jsx");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password required");
    } else {
      //res.send({ jwt: toJWT({ userId: 1 }) });
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        res.status(400).send({
          message: "The entered email does not match any user",
        });
      } else if (bcrypt.compareSync(password, user.password)) {
        const jwt = toJWT({ userId: user.id });
        res.send({
          jwt,
        });
      } else {
        res.status(400).send({
          message: "Incorrect password",
        });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
