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
