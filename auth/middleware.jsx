const User = require("../models").user;
const { toData } = require("./jwt.jsx");

async function auth(req, res, next) {
  // check for authorization header and split it
  // if authorization header is there, auth type is Bearer and there's something at auth[1]

  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // try and catch call "toData()"
    try {
      const data = toData(auth[1]);
      // use returned value from "toData()" to look for that user in the DB with User
      const user = await User.findByPk(data.userId);
      // "data" returns { userId: X, iat: XX, exp: XXX}
      console.log(":data:", data);
      // if not found status 404
      if (!user) {
        res.status(404).send("User not found");
      } else {
        // if found set to req.user = user and call next()
        req.user = user;
        next();
      }
    } catch (e) {
      res.status(400).send({ message: `Error ${e.name}: ${e.message}` });
    }
  } else {
    // if not, return 401 status to valid credentials
    res.status(401).send({ message: "Please enter valid credentials" });
  }
}
module.exports = auth;
