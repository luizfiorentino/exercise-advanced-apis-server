const Image = require("../models").image;
const { Router } = require("express");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const allImages = await Image.findAll();
    res.send(allImages);
  } catch (e) {
    next(e);
  }
});

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

module.exports = router;
