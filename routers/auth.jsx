const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt.jsx");

const router = new Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Email and password required");
  } else {
    res.send({ jwt: toJWT({ userId: 1 }) });
  }
});

module.exports = router;
