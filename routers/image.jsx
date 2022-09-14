const Image = require("../models").image;
const { Router } = require("express");
const { toData, toJWT } = require("../auth/jwt.jsx");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allImages = await Image.findAll();
    res.json(allImages);
  } catch (e) {
    next(e);
  }
});

//

router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.imageId);
    const thisImage = await Image.findByPk(imageId);

    if (!thisImage) {
      res.status(404).send("Image with informed id not found");
    } else {
      res.json(thisImage);
    }
  } catch (e) {
    next(e);
    console.log(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    const newImage = await Image.create({ title, url });
    res.json(newImage);
  } catch (e) {
    next(e);
  }
});

// router.get("/", async (req, res, next) => {
//   const auth =
//     req.headers.authorization && req.headers.authorization.split(" ");
//   if (auth && auth[0] === "Bearer" && auth[1]) {
//     try {
//       const data = toData(auth[1]);
//       const allImages = await Image.findAll();
//       res.json(allImages);
//     } catch (e) {
//       res.status(400).send("Invalid JWT token");
//     }
//   } else {
//     res.status(401).send({ message: "Please enter valid credentials" });
//   }
// });

module.exports = router;
